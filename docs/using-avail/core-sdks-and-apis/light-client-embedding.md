---
id: embedding-the-light-client
title: Embedding the Light Client
sidebar_label: Embedding the Light Client
sidebar_position: 3
description: How to embed the light client into a dust application
keywords:
  - docs
  - avail
  - data
  - availability
  - how-to
  - light client
  - embedding
  - rust
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: embedding-the-light-client
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Embedding the light client

## When and how to embed the light client

The Avail light client plays a vital role in ensuring the availability and correctness of data within the Avail network. By employing random sampling, it achieves security levels comparable to full nodes. Furthermore, by leveraging the peer-to-peer network, it enhances overall data availability while reducing the load on full nodes.  
The light client is capable of downloading and verifying application-specific data submitted to Avail, which can be conveniently queried using the light client API.  
The light client exposes an HTTP API that enables users to query the status, confidence, and application data for each processed block. When a block is finalized in Avail, the light client performs random sampling and verification, calculates confidence in the given block data, and if the confidence is high, retrieves the application data from the block. This data is then verified and stored locally for easy access.


## Examples

### Fetching the number of the latest block processed by light client

To fetch the number of the latest block processed by light client, we can perform `GET` request on `/v1/latest_block` endpoint.

<Tabs groupId="examples" defaultValue="rust">
<TabItem value="curl" label="CURL">

```sh
curl "http://localhost:7000/v1/latest_block"
```

Response:

```json
{
  "latest_block": 10
}
```

</TabItem>
<TabItem value="rust" label="Rust">

```rust
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct LatestBlock {
    pub latest_block: u32,
}

const LIGHT_CLIENT_URL: &str = "http://localhost:7000";

let latest_block_url = format!("{LIGHT_CLIENT_URL}/v1/latest_block");
let response = reqwest::get(latest_block_url).await.unwrap();

if response.status() == StatusCode::OK {
    let latest_block: LatestBlock =
        serde_json::from_str(&response.text().await.unwrap()).unwrap();
    println!("{latest_block:?}");
}
// ...error handling...
```
</TabItem>
</Tabs>

### Fetching the confidence for given block

To fetch the the confidence for specific block, which is already processed by application client, we can perform `GET` request on `/v1/confidece/{block_number}` endpoint.

<Tabs groupId="examples">
<TabItem value="curl" label="CURL">

```sh
curl "http://localhost:7000/v1/confidence/1"
```

Response:

```json
{
  "block": 1,
  "confidence": 93.75,
  "serialised_confidence": "5232467296"
}
```

</TabItem>
<TabItem value="rust" label="Rust">

```rust
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Confidence {
    pub block: u32,
    pub confidence: f64,
    pub serialised_confidence: Option<String>,
}
	
const LIGHT_CLIENT_URL: &str = "http://localhost:7000";

let block_number = 1;
let confidence_url = format!("{LIGHT_CLIENT_URL}/v1/confidence/{block_number}");
let response = reqwest::get(confidence_url).await.unwrap();

if response.status() == StatusCode::OK {
    let confidence: Confidence =
        serde_json::from_str(&response.text().await.unwrap()).unwrap();
    println!("{confidence:?}");
}
// ...error handling...
```

</TabItem>
</Tabs>

### Fetching decoded application data for given block

After data is verified, it can be fetched with `GET` request on `/v1/appdata/{block_number}` endpoint, by specifying `decode=true` query parameter.

<Tabs groupId="examples">
<TabItem value="curl" label="CURL">

#### JSON response

```sh
curl "http://localhost:7000/v1/appdata/1?decode=true"
```

Response:

```json
{
  "block": 46,
  "extrinsics": [
    "ZXhhbXBsZQ=="
  ]
}
```

#### Decoded extrinsic

```sh
curl -s "http://127.0.0.1:7000/v1/appdata/1?decode=true" | jq -r '.extrinsics[-1]' | base64 -d
```

Response:

```json
"example"
```

</TabItem>
<TabItem value="rust" label="Rust">

```rust

use base64::Engine as _;
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ExtrinsicsData {
    pub block: u32,
    pub extrinsics: Vec<String>,
}

const LIGHT_CLIENT_URL: &str = "http://localhost:7000";

let block_number = 2;
let confidence_url = format!("{LIGHT_CLIENT_URL}/v1/appdata/{block_number}?decode=true");
let response = reqwest::get(confidence_url).await.unwrap();

if response.status() == StatusCode::OK {
    let data: ExtrinsicsData =
        serde_json::from_str(&response.text().await.unwrap()).unwrap();

    let decoded_bytes = engine::general_purpose::STANDARD
        .decode(&data.extrinsics[0])
        .unwrap();
    let decoded_string = String::from_utf8(decoded_bytes).unwrap();
    println!("{decoded_string:?}");
}

// ...error handling...
```

</TabItem>
</Tabs>

### Waiting for application data to be verified

If light client is still processing specific block, we can poll light client with `GET` request on `/v1/appdata/{block_number}` endpoint, and wait for data to became available.

<Tabs groupId="examples">
<TabItem value="curl" label="CURL">

```sh
curl "http://localhost:7000/v1/appdata/2"
```

If response status code is `401` and body is:

```json
"Processing block"
```

we need to poll endpoint until data becomes available.

</TabItem>
<TabItem value="rust" label="Rust">

```rust
use avail_subxt::primitives::AppUncheckedExtrinsic;
use serde::{Deserialize, Serialize};
use anyhow::anyhow;
use reqwest::StatusCode;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ExtrinsicsData {
    pub block: u32,
    pub extrinsics: Vec<AppUncheckedExtrinsic>,
}

const POLLING_TIMEOUT: Duration = Duration::from_secs(120);
const POLLING_INTERVAL: Duration = Duration::from_secs(1);
const LIGHT_CLIENT_URL: &str = "http://localhost:7000";

async fn wait_for_appdata(appdata_url: &str, block: u32) -> anyhow::Result<ExtrinsicsData> {
    let appdata_url = format!("{LIGHT_CLIENT_URL}/v1/appdata/{block}");
    
    let start_time = std::time::Instant::now();

    loop {
        if start_time.elapsed() >= POLLING_TIMEOUT {
            return Err(anyhow!("Poll timeout exceeded"));
        }

        let response = reqwest::get(&appdata_url).await?;

        match response.status() {
            // If status is OK. response continas json representation of submitted data
            StatusCode::OK => {
                let text = &response.text().await?;
                return Ok(serde_json::from_str(text)?);
            }
            // If it is not found, there is no data for given block and application
            StatusCode::NOT_FOUND => {
                return Ok(ExtrinsicsData {
                    block,
                    extrinsics: vec![],
                })
            }
            // Wait for data to became available otherwise
            _ => {
                tokio::time::sleep(POLLING_INTERVAL).await;
                continue;
            }
        }
    }
}

```

Function `wait_for_appdata` will block until data is available or timeout is reached.

</TabItem>
</Tabs>

## API reference

In case of error, endpoints will return response with `500 Internal Server Error` status code, and descriptive error message.

### **GET** `/v1/mode`

Retrieves the operating mode of the light client. Light client can operate in two different modes, `LightClient` or `AppClient`, depending on configuration of application ID.

#### Responses

If operating mode is `LightClient` response is:

> Status code: `200 OK`
```json
"LightClient"
```

In case of `AppClient` mode, response is:

> Status code: `200 OK`
```json
{"AppClient": {app_id}}
```

### **GET** `/v1/latest_block`

Retrieves the latest block processed by the light client.

#### Responses

> Status code: `200 OK`
```json
{"latest_block":{block_number}}
```

### **GET** `/v1/confidence/{block_number}`

Given a block number, it returns the confidence computed by the light client for that specific block.

> Path parameters:
- `block_number` - block number (requred)

#### Responses

In case when confidence is computed:

> Status code: `200 OK`
```json
{"block":1,"confidence":93.75,"serialised_confidence":"5232467296"}
```

If confidence is not computed, and specified block is before the latest processed block:

> Status code: `400 Bad Request`
```json
"Not synced"
```

If confidence is not computed, and specified block is after the latest processed block:

> Status code: `404 Not Found`
```json
"Not found"
```

### **GET** `/v1/appdata/{block_number}`

Given a block number, it retrieves the hex-encoded extrinsics for the specified block, if available. Alternatively, if specified by a query parameter, the retrieved extrinsic is decoded and returned as a base64-encoded string.

> Path parameters:
- `block_number` - block number (requred)

> Query parameters:
- `decode` - `true` if decoded extrinsics are requested (boolean, optional, default is `false`)

#### Responses

If application data is available, and decode is `false` or unspecified:

> Status code: `200 OK`
```json
{"block":1,"extrinsics":["0xc5018400d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d01308e88ca257b65514b7b44fc1913a6a9af6abc34c3d22761b0e425674d68df7de26be1c8533a7bbd01fdb3a8daa5af77df6d3fb0a67cde8241f461f4fe16f188000000041d011c6578616d706c65"]}
```

If application data is available, and decode is `true`:

> Status code: `200 OK`
```json
{"block":1,"extrinsics":["ZXhhbXBsZQ=="]}
```

If application data is not available, and specified block is the latest block:

> Status code: `401 Unauthorized`
```json
"Processing block"
```

If application data is not available, and specified block is not the latest block:

> Status code: `404 Not Found`
```json
"Not found"
```

### **GET** `/v1/status/{block_number}`

Retrieves the status of the latest block processed by the light client.

> Path parameters:
- `block_number` - block number (requred)

#### Responses

If latest processed block exists, and `app_id` is configured (otherwise, `app_id` is not set):

> Status code: `200 OK`
```json
{"block_num":89,"confidence":93.75,"app_id":1}
```

If there are no processed blocks:

> Status code: `404 Not Found`
```json
"Not found"
```

## API Version 2 reference

### **GET** `/v2/version`

Gets the version of the light client binary, and the version of the compatible network.

Response:

```yaml
HTTP/1.1 200 OK
Content-Type: application/json

{
  "version": "{version-string}",
  "network_version": "{version-string}"
}
```

- **version** - the Avail Light Client version
- **network_version** - Avail network version supported by the Avail Light Client

## **GET** `/v2/status`

Gets current status and active modes of the light client.

Response:

```yaml
HTTP/1.1 200 OK
Content-Type: application/json

{
  "modes": [
    "light",
    "app",
    "partition"
  ],
  "app_id": {app-id}, // Optional
  "genesis_hash": "{genesis-hash}",
  "network": "{network}",
  "blocks": {
    "latest": {latest},
    "available": { // Optional
      "first": {first},
      "last": {last}
    },
    "app_data": { // Optional
      "first": {first},
      "last": {last}
    },
    "historical_sync": { // Optional
      "synced": false,
      "available": { // Optional
        "first": {first},
        "last": {last}
      },
      "app_data": { // Optional
        "first": {first},
        "last": {last}
      }
    }
  },
  "partition": "{partition}" // Optional
}
```

- **modes** - active modes
- **app_id** - if **app** mode is active, this field contains configured application ID
- **genesis_hash** - genesis hash of the network to which the light client is connected
- **network** - network host, version and spec version light client is currently con
- **blocks** - state of processed blocks
- **partition** - if configured, displays partition which light client distributes to the peer to peer network

### Modes

- **light** - data availability sampling mode, the light client performs random sampling and calculates confidence
- **app** - light client fetches, verifies, and stores application-related data
- **partition** - light client fetches configured block partition and publishes it to the DHT

### Blocks

- **latest** - block number of the latest [finalized](https://docs.substrate.io/learn/consensus/) block received from the node
- **available** - range of blocks with verified data availability (configured confidence has been achieved)
- **app_data** - range of blocks with app data retrieved and verified
- **historical_sync** - state for historical blocks syncing up to configured block (ommited if historical sync is not configured)

### Historical sync

- **synced** - `true` if there are no historical blocks left to sync
- **available** - range of historical blocks with verified data availability (configured confidence has been achieved)
- **app_data** - range of historical blocks with app data retrieved and verified


## POST `/v2/submit`

Submits application data to the avail network.\
In case of `data` transaction, data transaction is created, signed and submitted.\
In case of `extrinsic`, externaly created and signed transaction is submitted. Only one field is allowed per request.\
Both `data` and `extrinsic` has to be encoded using base64 encoding.

Request:

```yaml
POST /v2/submit HTTP/1.1
Host: {light-client-url}
Content-Type: application/json
Content-Length: {content-length}

{
  "data": "{base-64-encoded-data}" // Optional
  "extrinsic": "{base-64-encoded-data}" // Optional
}
```

Response:

```yaml
HTTP/1.1 200 OK
Content-Type: application/json

{
  "block_hash": "{block-hash}",
  "hash": "{transaction-hash}",
  "index": {transaction-index}
}
```

If **app** mode is not active (or signing key is not configured and `data` is submitted) response is:

```yaml
HTTP/1.1 404 Not found
```

## Errors

In case of an error, endpoints will return a response with `500 Internal Server Error` status code, and descriptive error message:

```yaml
HTTP/1.1 500 Internal Server Error
Content-Type: text/plain

Internal Server Error
```

## WebSocket API

The Avail Light Client WebSocket API allows real-time communication between a client and a server over a persistent connection, enabling push notifications as an alternative to polling. Web socket API can be used on its own or in combination with HTTP API to enable different pull/push use cases.

### POST `/v2/subscriptions`

Creates subscriptions for given topics. In case of reconnects, the user needs to subscribe again.

Request:

```yaml
POST /v2/subscriptions HTTP/1.1
Host: {light-client-url}
Content-Type: application/json
Content-Length: {content-length}

{
  "topics": ["header-verified", "confidence-achieved", "data-verified"],
  "data_fields": ["data", "extrinsic"]
}
```

Response:

```yaml
HTTP/1.1 200 OK
Content-Type: application/json

{
  "subscription_id": "{subscription-id}"
}
```

#### Topics

- **header-verified** - header finality is verified and header is available
- **confidence-achieved** - confidence is achieved
- **data-verified** - block data is verified and available

#### Data fields

Filters **data-verified** message. Optional parameter used when encoded **extrinsic** is needed. If omitted, only decoded **data** is present in the message.

### GET `/v2/ws/{subscription-id}`

Connects to Avail Light Client web socket. Multiple connections are currently allowed.

### Client-to-server messages

Every request should contain unique **request_id** field, used to correlate request with response.

#### Request version

Request Avail Light Client version data.

```json
{
  "type": "version",
  "request_id": "{uuid}"
}
```

### Request status

Request current Avail Light Client status data.

```json
{
  "type": "status",
  "request_id": "{uuid}"
}
```

### Submit data transaction

Submits data transaction to the Avail.

```json
{
	"type": "submit",
	"request_id": "{uuid}",
	"message": {
		"data": "{base-64-encoded-data}", // Optional
		"extrinsic": "{base-64-encoded-data}" // Optional
	}
}
```

### Server-to-client messages

If response contains ******request_id****** field, it will be pushed to the client which initiated request. Those messages are not subject to a topic filtering at the moment.

#### Version

Version response.

```json
{
  "topic": "version",
  "request_id": "{uuid}",
  "message": {
    "version": "{version-string}",
    "network_version": "{version-string}"
  }
}
```

### Status

Status response.

```json
{
  "topic": "status",
  "request_id": "{uuid}",
  "message": {
    "modes": [
      "light",
      "app",
      "partition"
    ],
    "app_id": {app-id}, // Optional
    "genesis_hash": "{genesis-hash}",
    "network": "{network}",
    "blocks": {
      "latest": {latest},
      "available": {  // Optional
        "first": {first},
        "last": {last}
      },
      "app_data": {  // Optional
        "first": {first},
        "last": {last}
      },
      "historical_sync": {  // Optional
        "synced": false,
        "available": {  // Optional
          "first": {first},
          "last": {last}
        },
        "app_data": {  // Optional
          "first": {first},
          "last": {last}
        }
      }
    },
    "partition": "{partition}"
  }
}
```

#### Data transaction submitted

Data transaction submitted response. It contains transaction **hash** used to correlate transaction with verified data once transaction is included in the block and verified by the light client.

```json
{
  "topic": "data-transaction-submitted",
  "request_id": "{uuid}",
  "message": {
    "block_hash": "{block-hash}",
    "hash": "{transaction-hash}",
    "index": {transaction-index}
  }
}
```

If **app** mode is not active or signing key is not configured error response is sent with descriptive error message.

#### Errors

In case of errors, descriptive error message is sent:

```json
{
  "topic": "error",
  "request_id": "{uuid}", // Optional
  "code": "{error-code}",
  "message": "{descriptive-error-message}"
}
```

Error codes:

- **bad-request** - request sent via web socket message is not valid

#### Header verified

When header verification is finished, the message is pushed to the light client on a **header-verified** topic:

```json
{
  "topic": "header-verified",
  "message": {
    "block_number": {block-number},
    "header": {
      "hash": "{hash}",
      "parent_hash": "{parent-hash}",
      "number": {number},
      "state_root": "{state-root}",
      "extrinsics_root": "{extrinsics-root}",
      "extension": {
        "rows": {rows},
        "cols": {cols},
        "data_root": "{data-root}", // Optional
        "commitments": [
          "{commitment}", ...
        ],
        "app_lookup": {
          "size": {size},
          "index": [
            {
              "app_id": {app-id},
              "start": {start}
            }
          ]
        }
      }
    }
  }
}
```

#### Confidence achieved

When high confidence in data availability is achieved, the message is pushed to the light client on the **confidence-achieved** topic:

```json
{
  "topic": "confidence-achieved",
  "message": {
    "block_number": {block-number},
    "confidence": {confidence} // Optional
  }
}
```

#### Data verified

When high confidence in data availability is achieved, the message is pushed to the light client on the **data-verified** topic:

```json
{
  "topic": "data-verified",
  "message": {
    "block_number": "{block-number}",
    "data_transactions": [{
      "data": "{base-64-encoded-data}", // Optional
      "extrinsic": "{base-64-encoded-extrinsic}" // Optional
    }]
  }
}
```
