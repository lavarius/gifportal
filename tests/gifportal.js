// Import statements
import assert from "assert";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
const { SystemProgram } = anchor.web3;

describe("gifportal", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());
    const program = anchor.workspace.Gifportal;

    it("Starts stuff off, get the transaction, and count GIF", async () => {
        const baseAccount = anchor.web3.Keypair.generate();
        try {
            const txSignature = await program.methods.startStuffOff().accounts({
                baseAccount: baseAccount.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            }).signers([baseAccount]).rpc();

            console.log("Transaction Signature:", txSignature);
        } catch (error) {
            console.error("error sending transaction:", error);
        }

        // await program.provider.connection.confirmTransaction(txSignature, 'confirmed');

        let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
        console.log('GIF Count', account.totalGifs.toString());
    });
});