export default class Slotarr {
  constructor($Main) {
    if (!$Main) return;
    this.$amount = $Main.querySelector("#amount");
    this.$separaters = $Main.querySelectorAll('[name="separater"]');
    this.$input = $Main.querySelector("#input");
    this.$outputDetail = $Main.querySelector("#outputDetail");
    this.$outputSummary = $Main.querySelector("#outputSummary");
    this.$execute = $Main.querySelector("#execute");
    this.$multiple = $Main.querySelector("#multiple");
    this.multipleAmount = 100;
    this.dict = {
      split_string: [",", " "],
      join_string: "＿",
    };
    this.splitString = this.dict.split_string[0];
    this.joinString = this.dict.join_string;

    this.attachEvent();
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
    let value = 0;
    this.$separaters.forEach((elem) => {
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
    return this.$input.value.split(this.dict.split_string[this.separater]);
  }

  /**
   * seedArrayで返ってくる配列を元にスロットの数だけランダムに抽出した配列を返す
   */
  get shuffledArray() {
    let array = [];

    for (let i = 0; i < this.slotAmount; i++) {
      array.push(this.seedArray[this.idx]);
    }

    return array;
  }

  /**
   * seedArrayで返ってくる配列を元にスロットの数だけランダムに抽出した配列を n 個入った二次元配列を返す
   */
  get shuffledMultipleArray() {
    let multiArray = [];

    for (let i = 0; i < this.multipleAmount; i++) {
      let array = [];
      for (let i = 0; i < this.slotAmount; i++) {
        array.push(this.seedArray[this.idx]);
      }
      multiArray.push(array);
    }

    return multiArray;
  }

  /**
   * イベントのバインド
   */
  attachEvent() {
    this.$execute.addEventListener("click", () => {
      this.resetResult();
      this.setResult(this.shuffledArray);
    });

    this.$multiple.addEventListener("click", () => {
      this.resetResult();
      this.setMultipleResult(this.shuffledMultipleArray);
    });
  }

  /**
   * 引数に渡した配列の中身が全て同じかどうか返す
   */
  isEqual(target) {
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
  setResult(result) {
    this.$outputDetail.textContent = result.join(this.joinString);
  }

  /**
   * シャッフル結果を文字列にしてテキストノードに挿入する
   */
  setMultipleResult(result) {
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
            count: (memo[idx].count += 1),
          });
        }
        return memo;
      }, [])
      .sort((a, b) => b.count - a.count);

    formattedResult.forEach((one, i) => {
      const $p = document.createElement("p");
      $p.textContent = String(i + 1).padStart(2, "0") + ": " + one.text;
      $p.classList.toggle("-equal", one.isEqual);
      this.$outputDetail.appendChild($p);
    });

    summary.forEach((one) => {
      const $p = document.createElement("p");
      $p.textContent = one.text + ": " + one.count + "回";
      this.$outputSummary.appendChild($p);
    });
  }
}
