import { clusterApiUrl, Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

(async () => {

  const CONNECTION = new Connection(clusterApiUrl("devnet"));

  const MY_KP = Keypair.fromSecretKey(bs58.decode("33wCj3UfzQeHacfVFdZBbXADPXKVXZGiDJqGTxa3hanRJCYVA1YoJDvqCvU7KbZt87Hvd5hDxnFtz57Wm5jZdDVg"));
  const GENERATED_KP = Keypair.generate();

  const tx = new Transaction();

  tx.instructions = [
    SystemProgram.createAccount({
      fromPubkey: MY_KP.publicKey,
      newAccountPubkey: GENERATED_KP.publicKey,
      lamports: await CONNECTION.getMinimumBalanceForRentExemption(0),
      space: 0,
      programId: SystemProgram.programId,

    })
  ];

  const txHash = await CONNECTION.sendTransaction(tx, [
    MY_KP,
    GENERATED_KP
  ])

  console.log(txHash)
})();
