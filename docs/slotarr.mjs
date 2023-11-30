export default class Slotarr {
  constructor($Main) {
    if (!$Main) return;
    this.$Separaters = $Main.querySelectorAll('[name="separater"]');
    this.$Input = $Main.querySelector("#input");
    this.$Result = $Main.querySelector("#outputDetail");
    this.$Summary = $Main.querySelector("#outputSummary");
    this.$Buttons = $Main.querySelectorAll(".Input__button");
    this.joinString = "＿";
    this.arrangedClassname = "-arranged";
    this.firstClassname = "-first";

    this.attachEvent();
  }

  get separateString() {
    // radio の選択されている方の value 値を返す
    return [...this.$Separaters].find(({ checked }) => checked).value;
  }

  get randomly() {
    return Math.floor(Math.random() * this.seed.length);
  }

  // 区切り文字で分割した配列を返す
  get seed() {
    return this.$Input.value.split(this.separateString);
  }

  // seed　の中身をランダムに入れ替えた配列と、その配列の中身が全て揃っているか否かを示したオブジェクトを返す
  get shuffled() {
    const array = Array.from(
      { length: this.seed.length },
      () => this.seed[this.randomly]
    );
    return {
      array,
      isArranged: array.every((item) => item === array[0]),
    };
  }

  // shuffled[] を 100 個もつ二次元配列を返す
  get multipleShuffled() {
    return Array.from({ length: 100 }, () => this.shuffled);
  }

  attachEvent() {
    this.$Buttons.forEach(
      ($button) =>
        $button.addEventListener("click", ({ target: { id } }) =>
          this.handleClickButton(id)
        ),
      false
    );
  }

  handleClickButton(id) {
    this.initializeResult();
    this.updateResult(id);
  }

  initializeResult() {
    const { $Result, $Summary } = this;
    while ($Summary.firstChild) {
      $Summary.removeChild($Summary.firstChild);
    }
    while ($Result.firstChild) {
      $Result.removeChild($Result.firstChild);
    }
  }

  updateResult(id) {
    if (id === "once") {
      const $p = this.createShuffledText(this.shuffled);
      this.$Result.appendChild($p);
    } else {
      // 2 回参照したいのでキャッシュする
      const multipleShuffled = [...this.multipleShuffled];

      // seed をシャッフルして繋いだ文字列を 100 個の p 要素にして配置する
      multipleShuffled
        .map((shuffled) => this.createShuffledText(shuffled))
        .forEach(($p) => this.$Result.appendChild($p));

      // seed をシャッフルして繋いだ文字列から、揃っているものだけを抽出する
      const arranged = multipleShuffled.filter(({ isArranged }) => isArranged);
      // seed の文字列ごとに揃った数を追加する
      this.seed
        .map((string) => ({
          string,
          length: arranged.filter(({ array }) => array[0] === string).length,
        }))
        // 降順にソートする
        .sort((a, b) => b.length - a.length)
        // p 要素を作って配置する
        .map((v, i) => this.createSummaryText({ ...v, i }))
        .forEach(($p) => this.$Summary.appendChild($p));
    }
  }

  // <p class="-arranged?">◯_×_△</p> を作って返す
  createShuffledText({ array, isArranged }) {
    const $p = document.createElement("p");
    $p.textContent = array.join(this.joinString);
    $p.classList.toggle(this.arrangedClassname, isArranged);
    return $p;
  }

  // <p>◯: n回</p> を作って返す
  createSummaryText({ string, length, i }) {
    const $p = document.createElement("p");
    $p.textContent = `${string}: ${length}回`;
    $p.classList.toggle(this.firstClassname, i === 0);
    return $p;
  }
}
