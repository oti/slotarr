const dict = {
  split_string: [",", " "],
  join_string: "＿",
};

export default class Slotarr {
  $amount: HTMLInputElement;
  $separaters: NodeListOf<HTMLInputElement>;
  $input: HTMLTextAreaElement;
  $outputDetail: HTMLDivElement;
  $outputSummary: HTMLDivElement;
  $execute: HTMLButtonElement;
  $multiple: HTMLButtonElement;
  multipleAmount: number;
  splitString: string;
  joinString: string;

  constructor() {
    this.$amount = document.querySelector("#amount") as HTMLInputElement;
    this.$separaters = document.querySelectorAll(
      '[name="separater"]'
    ) as NodeListOf<HTMLInputElement>;
    this.$input = document.querySelector("#input") as HTMLTextAreaElement;
    this.$outputDetail = document.querySelector(
      "#outputDetail"
    ) as HTMLDivElement;
    this.$outputSummary = document.querySelector(
      "#outputSummary"
    ) as HTMLDivElement;
    this.$execute = document.querySelector("#execute") as HTMLButtonElement;
    this.$multiple = document.querySelector("#multiple") as HTMLButtonElement;
    this.multipleAmount = 100;
    this.splitString = dict.split_string[0];
    this.joinString = dict.join_string;
  }

  /**
   * 項目の数とスロットの数が同じがどうかを返す
   */
  get isSameAmountOfItemToSlot() {
    return this.$amount.checked;
  }

  /**
   * @get 区切り文字を返す
   */
  get separater() {
    let value: number = 0;
    this.$separaters.forEach((elem: HTMLInputElement, i: number) => {
      if (elem.checked) {
        value = parseInt(elem.value, 10);
        return;
      }
    });
    return value;
  }

  /**
   * スロットの数を返す
   */
  get slotAmount() {
    return this.seedArray.length;
  }

  /**
   * slotAmount-1 を Max とする正の整数を返す
   */
  get idx() {
    return Math.floor(Math.random() * this.slotAmount);
  }

  /**
   * $inputのテキストから元となる配列を返す
   */
  get seedArray() {
    return this.$input.value.split(dict.split_string[this.separater]);
  }

  /**
   * seedArrayで返ってくる配列を元にスロットの数だけランダムに抽出した配列を返す
   */
  get shuffledArray() {
    let array: string[] = [];

    for (let i = 0; i < this.slotAmount; i++) {
      array.push(this.seedArray[this.idx]);
    }

    return array;
  }

  /**
   * seedArrayで返ってくる配列を元にスロットの数だけランダムに抽出した配列を n 個入った二次元配列を返す
   */
  get shuffledMultipleArray() {
    let multiArray: string[][] = [];

    for (let i = 0; i < this.multipleAmount; i++) {
      let array: string[] = [];
      for (let i = 0; i < this.slotAmount; i++) {
        array.push(this.seedArray[this.idx]);
      }
      multiArray.push(array);
    }

    return multiArray;
  }

  /**
   * 引数に渡した配列の中身が全て同じかどうか返す
   */
  isEqual(target: string[]) {
    for (let i = 0; i < this.slotAmount; i++) {
      if (target[0] !== target[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * 結果表示を初期化する
   */
  resetResult() {
    this.$outputSummary.textContent = "";
    this.$outputDetail.textContent = "";
  }

  /**
   * シャッフル結果を文字列にしてテキストノードに挿入する
   */
  setResult(result: string[]) {
    this.$outputDetail.textContent = result.join(this.joinString);
  }

  /**
   * シャッフル結果を文字列にしてテキストノードに挿入する
   */
  setMultipleResult(result: string[][]) {
    const formattedResult = result.map((one) => ({
      text: one.join(this.joinString),
      isEqual: this.isEqual(one),
    }));

    const summary = formattedResult
      .filter((one) => one.isEqual)
      .reduce((memo, item) => {
        const summaryText = item.text.split(this.joinString)[0];
        const idx = memo.findIndex(({ text }) => text === summaryText);
        if (idx < 0) {
          memo.push({
            text: summaryText,
            count: 1,
          });
        } else {
          memo.splice(idx, 1, {
            text: memo[idx].text,
            count: memo[idx].count += 1,
          });
        }
        return memo;
      }, [])
      .sort((a, b) => b.count - a.count);

    formattedResult.forEach(
      (one: { text: string; isEqual: boolean }, i: number) => {
        const $p = document.createElement("p");
        $p.textContent = String(i + 1).padStart(2, "0") + ": " + one.text;
        $p.classList.toggle("-equal", one.isEqual);
        this.$outputDetail.appendChild($p);
      }
    );

    summary.forEach((one: { text: string; count: number }) => {
      const $p = document.createElement("p");
      $p.textContent = one.text + ": " + one.count + "回";
      this.$outputSummary.appendChild($p);
    });
  }

  /**
   * イベントのバインド
   */
  dispatch() {
    this.$execute.addEventListener("click", (ev: Event) => {
      this.resetResult();
      this.setResult(this.shuffledArray);
    });

    this.$multiple.addEventListener("click", (ev: Event) => {
      this.resetResult();
      this.setMultipleResult(this.shuffledMultipleArray);
    });
  }
}
