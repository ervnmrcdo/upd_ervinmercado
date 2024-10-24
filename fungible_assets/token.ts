import { clusterApiUrl, Keypair, Connection, } from "@solana/web3.js"
import bs58 from "bs58";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, } from "@solana/spl-token";

(async () => {

	const connection = new Connection(clusterApiUrl("devnet"));

	const user = Keypair.fromSecretKey(bs58.decode(""))

	const tokenMint = await createMint(
		connection,
		user,
		user.publicKey,
		null,
		2,
	);

	console.log(`Created token mint ${tokenMint.toString()}`);

	//const recipient = PublicKey("");
	//
	//const tokenMintAccount = new PublicKey("")
	//
	//const tokenAccount = await getOrCreateAssociatedTokenAccount(
	//	connection,
	//	user, 
	//	tokenAc
	//)
	//

	const MINOR_UNIT_PER_MAJOR_UNITS = Math.pow(10, 2);

	const recipientAssociatedTokenAccount = new PublicKey("");

	txHash = await mintTo(
		connection,
		user,
		tokenMintAccount,
		recipientAssociatedTokenAccount,
		user,
		10 * MINOR_UNIT_PER_MAJOR_UNITS,
	);
	console.log("txHash: ", txHash);
})();
