declare module '@3d-dice/dice-box' {

  type Result = {
    id: number;
    modifier: number;
    mods: any[];
    qty: number;
    rolls: RollResult[],
    sides: number;
    value: number;
  };

  type RollResult = {
    data?: any;
    dieType: string;
    groupId: number;
    rollId: number;
    sides: number;
    theme: string;
    themeColor: React.CSSProperties['color'];
    value: number;
  }

  class DiceBox {
    constructor(options: any);
    init(): void;
    onRollComplete: (results: Result[]) => void;
    roll(notation: string | string[] | any[]): void;
    add(notation: string | string[] | any[]): void;
    clear: () => void;
    hide: (className?: string) => void;
    show: () => void;
  }

  export = DiceBox;
}