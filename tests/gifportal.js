// Import statements
import assert from "assert";
// import { GifPortal } from "../target/types/gifportal"; // Corrected import
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
const { SystemProgram } = anchor.web3;
// const anchor = require("@coral-xyz/anchor");

async function checkIfBaseAccountExists(program, publicKey) {
    try {
        await program.account.baseAccount.fetch(publicKey);
        return true; // Account exists
    } catch (error) {
        // if (error instanceof anchor.web3.AccountNotFoundError) {
        // Check if the error message indicates an account not found
        if (error.message.includes("Account not found")) {
            return false; // Account does not exist
        } else {
            throw error; // Rethrow unexpected errors
        }
    }
}

const main = async () => {
    console.log("Starting test...");
    // Set the provider
    // const provider = anchor.AnchorProvider.local();
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.Gifportal;

    // reference base account
    const baseAccount = anchor.web3.Keypair.generate();

    // Check if the base account exists
    const baseAccountExists = await checkIfBaseAccountExists(program, baseAccount.publicKey);
    // console.log(`Base account exists: ${baseAccountExists}`);

    if (!baseAccountExists) {
        // If the account doesn't exist, create and initialize it
        await program.methods.startStuffOff(new anchor.BN(0), {
            accounts: {
                baseAccount: baseAccount.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [baseAccount],
        }).rpc();
        console.log("Created and initialized base account.");
    }

    // Now, you can safely call start_stuff_off knowing the account exists
    const startStuffOffTx = await program.methods.startStuffOff(new anchor.BN(0), {
        accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
    }).rpc();

    // Confirm the transaction
    await program.provider.connection.confirmTransaction(startStuffOffTx);
    console.log("Confirmed start_stuff_off transaction.");

    // Refactored code to mimic chaining without using dots
    // const startStuffOffMethod = program.methods.startStuffOff();

    // Manually applying accounts and signers
    // startStuffOffMethod.accounts({
    //     baseAccount: baseAccount.publicKey,
    //     user: provider.wallet.publicKey,
    //     systemProgram: SystemProgram.programId,
    // }).signers([baseAccount]);

    // Finally, executing the method
    // const tx = await startStuffOffMethod.rpc();
    // const tx = await startStuffOffMethod;

    // Wait for the transaction to be confirmed
    // await program.provider.connection.confirmTransaction(tx);
    console.log("Waited for confirmed transaction");

    // Capture the transaction signature
    // const txSignature = tx.signature;
    const txSignature = startStuffOffTx.signature;
    console.log('txSignature:', txSignature)

    // Fetch the signature status
    try {
        const signatureStatuses = await program.provider.connection.getSignatureStatuses([txSignature]);
        console.log("Signature Statuses:", signatureStatuses);
    } catch (error) {
        console.error("Failed to get signature statuses:", error);
    }

    console.log("Your transaction signature", tx);

    let account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
    );
    console.log('GIF Count', account.totalGifs.toString());
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
runMain();