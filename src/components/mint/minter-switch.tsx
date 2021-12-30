import { FreeMinter } from 'components/mint/free-minter';
import { WLMinter } from 'components/mint/wl-minter';
import { MintType } from 'model/api/mint-response';
import React from 'react';

interface Props {
  mintType: MintType;
  mintCount?: number;
  nonce?: number;
  proof?: string[];
  onTransactionDone?: (error?: string) => void;
}

export const MinterSwitch: React.FunctionComponent<Props> = ({
  mintType,
  mintCount,
  nonce,
  proof,
  onTransactionDone,
}) => {
  switch (mintType) {
    case MintType.FREE:
      return <FreeMinter mintCount={mintCount!} onTransactionDone={onTransactionDone} />;
    case MintType.WHITELIST:
      return <WLMinter nonce={nonce!} proof={proof!} onTransactionDone={onTransactionDone} />;
    default:
      return null;
  }
};
