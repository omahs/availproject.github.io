---
id: explorer
title: How to Use the Kate Testnet Explorer
sidebar_label: Use the Explorer
description: A comprehensive guide on using the Avail Explorer to interact with the Avail network.
keywords:
  - docs
  - avail
  - explorer
  - accounts
image: https://docs.availproject.org/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Introduction

The [<ins>Kate Testnet Explorer</ins>](https://kate.avail.tools/) serves as a powerful interface for interacting with the Avail network. Whether you're a developer, a validator, or an end-user, the explorer provides you with the tools to inspect network activities, manage accounts, and participate in governance. This guide will walk you through its key features.

### Quick Navigation

- [Inspect Network Data](#inspect-network-data)
- [Manage Accounts](#manage-accounts)
- [Participate in Governance](#participate-in-governance)
- [Advanced Features](#advanced-features)

## Inspect Network Data

### Recent Blocks Overview

The default page of the explorer displays the most recently produced blocks, allowing you to monitor network activity in real-time.

![Avail Explorer](/img/avail/explorer.png)

### Block Details

Clicking on a block number (or block "height") will open a detailed view of that block, including transactions, validators, and more.

![Avail Explorer Block Detail](/img/avail/explorer-block-detail.png)

## Manage Accounts

The explorer allows you to create, manage, and recover accounts. You can also initiate transactions, stake tokens, and more. To learn how to create an account, check out the [<ins>Create and Manage Accounts guide</ins>](/about/accounts.md).

## Participate in Governance

From proposals to referenda, the explorer provides you with the tools to actively participate in network governance.

## Advanced Features

### Manual Transactions and RPC Calls

For developers and advanced users, the explorer offers features like manually submitting [transactions](https://docs.substrate.io/v3/concepts/extrinsics/), making RPC calls, and other debugging tasks.

:::info Confidence

The explorer hosts a light client that performs Data Availability Sampling (DAS) to verify data availability. The very latest blocks may not display a confidence score until this process is complete.

:::

## Conclusion

The Avail Explorer is a versatile tool for anyone involved in the Avail network. Whether you're inspecting blocks, managing accounts, or participating in governance, the explorer offers a comprehensive set of features to meet your needs.
