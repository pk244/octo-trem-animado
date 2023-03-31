// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import "./App.css";
import {
  ConnectButton,
  useWalletKit,
  WalletKitProvider,
} from "@mysten/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js";
import { useEffect } from "react";
import { CustodialConnectButton } from "./CustodialConnectButton";

function App() {
  const {
    currentWallet,
    currentAccount,
    signTransactionBlock,
    signAndExecuteTransactionBlock,
    signMessage,
  } = useWalletKit();

  useEffect(() => {
    // You can do something with `currentWallet` here.
  }, [currentWallet]);

  return (
    <div className="App">
      <ConnectButton />
      <div>
        <button
          onClick={async () => {
            const txb = new TransactionBlock();
            const [coin] = txb.splitCoins(txb.gas, [txb.pure(1)]);
            txb.transferObjects([coin], txb.pure(currentAccount!.address));

            console.log(await signTransactionBlock({ transactionBlock: txb }));
          }}
        >
          Sign Transaction
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            const txb = new TransactionBlock();
            const [coin] = txb.splitCoins(txb.gas, [txb.pure(1)]);
            txb.transferObjects([coin], txb.pure(currentAccount!.address));

            console.log(
              await signAndExecuteTransactionBlock({
                transactionBlock: txb,
                options: { showEffects: true },
              })
            );
          }}
        >
          Sign + Execute Transaction
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            console.log(
              await signMessage({
                message: new TextEncoder().encode("Message to sign"),
              })
            );
          }}
        >
          Sign message
        </button>
      </div>
      <hr />
      <div>
        <h3>Custodial Connect</h3>
        {/* features here will filter out any other installed wallets that don't support custodial connect */}
        <WalletKitProvider features={["suiWallet:custodialConnect"]}>
          <CustodialConnectButton />
        </WalletKitProvider>
      </div>
    </div>
  );
}

export default App;
