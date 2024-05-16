const anchor = require("@coral-xyz/anchor");

const main = async () => {
    console.log("Starting test...");

    // Set the provider
    // anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.Gifportal;

    const account = anchor.web3.Keypair.generate();

    const tx = await program.rpc.startStuffOff({
        accounts: {
            // Specify the account here
            myAccount: account.publicKey
        },
    });
    console.log("Your transaction signature", tx);
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