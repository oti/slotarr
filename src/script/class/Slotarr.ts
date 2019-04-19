export default class Slotarr {
  $amount: HTMLInputElement
  $input: HTMLTextAreaElement
  $output: HTMLDivElement
  $execute: HTMLButtonElement
  defaultSlotAmount: number

  constructor() {
    this.$amount = document.querySelector('#amount') as HTMLInputElement
    this.$input = document.querySelector('#input') as HTMLTextAreaElement
    this.$output = document.querySelector('#output') as HTMLDivElement
    this.$execute = document.querySelector('#execute') as HTMLButtonElement
    this.defaultSlotAmount = 3
  }

  get idx() {
    return Math.floor(Math.random() * this.slotAmount)
  }

  get isSameAmountOfItemToSlot() {
    return this.$amount.checked
  }

  get seedArray() {
    return this.$input.value.split(' ')
  }

  get slotAmount() {
    return this.isSameAmountOfItemToSlot ? this.seedArray.length : this.defaultSlotAmount
  }

  get shuffledArray() {
    let array = []

    for (let i=0; i<this.slotAmount; i++) {
      array.push(this.seedArray[this.idx]);
    }

    return array
  }

  setResult(array: string[]) {
    this.$output.textContent = array.join(' / ')
  }

  dispatch() {
    this.$execute.addEventListener('click', (ev: Event) => {
      this.setResult(this.shuffledArray)
    })
  }
}