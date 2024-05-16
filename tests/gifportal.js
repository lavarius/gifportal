const anchor = require("@coral-xyz/anchor");

const main = async () => {
    console.log("Starting test...");

    // use the testnet
    // const provider = new anchor.Provider('https://api.testnet.solana.com', {}, 'testnet');

    // Set the provider
    anchor.setProvider(anchor.AnchorProvider.env());
    // anchor.setProvider(provider);
    const program = anchor.workspace.gifportal;
    const tx = await program.rpc.startStuffOff();
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