import { clusterApiUrl, Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

(async () => {

  const CONNECTION = new Connection(clusterApiUrl("devnet"));

  const PRIVATE_KEY = "5gQWXvxghHYQKLm2F4vAa4JKE87YdcynKrkWT2AuheFLDKS3EAjLDWZHUkVmkov3gNRQLh6p6VSRvfc9HGjEHcZn";
  const decoded = bs58.decode(PRIVATE_KEY);

  const MY_KEYPAIR = Keypair.fromSecretKey(decoded);
  const NEW_ACCOUNT_KEY = Keypair.generate();

  const tx = new Transaction();
  const lamports = await CONNECTION.getMinimumBalanceForRentExemption(0);

  tx.instructions = [
    SystemProgram.createAccount({
      fromPubkey: MY_KEYPAIR.publicKey,
      newAccountPubkey: NEW_ACCOUNT_KEY.publicKey,
      lamports,
      space: 0,
      programId: SystemProgram.programId,
    }),
  ];

  const txHash = await CONNECTION.sendTransaction(tx, [
    MY_KEYPAIR,
    NEW_ACCOUNT_KEY,
  ]);

  console.log(txHash);



})();

