export default class Slotarr {
  $amount: HTMLInputElement
  $input: HTMLTextAreaElement
  $output: HTMLDivElement
  $execute: HTMLButtonElement
  $juuRen: HTMLButtonElement
  defaultSlotAmount: number
  splitString: string
  joinString: string

  constructor() {
    this.$amount = document.querySelector('#amount') as HTMLInputElement
    this.$input = document.querySelector('#input') as HTMLTextAreaElement
    this.$output = document.querySelector('#output') as HTMLDivElement
    this.$execute = document.querySelector('#execute') as HTMLButtonElement
    this.$juuRen = document.querySelector('#juuRen') as HTMLButtonElement
    this.defaultSlotAmount = 3
    this.splitString = ' '
    this.joinString = ' - '
  }

  /**
   * 項目の数とスロットの数が同じがどうかを返す
   */
  get isSameAmountOfItemToSlot() {
    return this.$amount.checked
  }

  /**
   * スロットの数を返す
   */
  get slotAmount() {
    return this.isSameAmountOfItemToSlot ? this.seedArray.length : this.defaultSlotAmount
  }

  /**
   * slotAmount-1 を Max とする正の整数を返す
   */
  get idx() {
    return Math.floor(Math.random() * this.slotAmount)
  }

  /**
   * $inputのテキストから元となる配列を返す
   */
  get seedArray() {
    return this.$input.value.split(this.splitString)
  }

  /**
   * seedArrayで返ってくる配列を元にスロットの数だけランダムに抽出した配列を返す
   */
  get shuffledArray() {
    let array: string[] = []

    for (let i=0; i<this.slotAmount; i++) {
      array.push(this.seedArray[this.idx]);
    }

    return array
  }

  /**
   * seedArrayで返ってくる配列を元にスロットの数だけランダムに抽出した配列を10個入った二次元配列を返す
   */
  get shuffled10Array() {
    let array10: string[][] = []
    
    for (let i=0; i<10; i++) {
      let array1: string[] = []
      for (let i=0; i<this.slotAmount; i++) {
        array1.push(this.seedArray[this.idx]);
      }
      array10.push(array1)
    }

    return array10
  }

  /**
   * 引数に渡した配列の中身が全て同じかどうか返す
   */
  isEqual(target: string[]) {
    for (let i=0; i<this.slotAmount; i++) {
      if (target[0] !== target[i]) {
        return false
      }
    }
    return true
  }

  /**
   * シャッフル結果を文字列にしてテキストノードに挿入する
   */
  setResult(result: string[]) {
    this.$output.textContent = result.join(this.joinString)
  }

  /**
   * シャッフル結果を文字列にしてテキストノードに挿入する
   */
  setJuuRenResult(result: string[][]) {
    result.forEach((one: string[], i: number, arr: string[][]) => {
      let $p: HTMLParagraphElement = document.createElement('p')
      $p.textContent = String(i+1).padStart(2, '0') + ': ' + one.join(this.joinString)

      if (this.isEqual(one)) {
        $p.classList.add('u-equal')
      }

      this.$output.appendChild($p)
    })
  }

  /**
   * イベントのバインド
   */
  dispatch() {

    this.$execute.addEventListener('click', (ev: Event) => {
      this.setResult(this.shuffledArray)
    })

    this.$juuRen.addEventListener('click', (ev: Event) => {
      this.$output.textContent = ''
      this.setJuuRenResult(this.shuffled10Array)
    })
  }
}