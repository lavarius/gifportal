const anchor = require("@project-serum/anchor");
// const { SystemProgram } = anchor.web3;
// const solanaWeb3 = require('@solana/web3.js');

const main = async () => {
    console.log("Starting test...");

    // Set the provider
    anchor.setProvider(anchor.Provider.env());

    // Replace with your cluster URL
    // const providerUrl = 'https://api.devnet.solana.com';
    // const provider = new solanaWeb3.Connection(providerUrl, 'confirmed');
    // anchor.setProvider(provider);
    const program = anchor.workspace.Gifportal;
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