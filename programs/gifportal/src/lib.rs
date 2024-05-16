use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("6FPmf5MsSEkBmsmS9sC5oLaHjDWGyrEQaBzom5U1NCHN");

#[program]
pub mod gifportal {
    use super::*;
    pub fn start_stuff_off(_ctx: Context<StartStuffOff>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct StartStuffOff {}
