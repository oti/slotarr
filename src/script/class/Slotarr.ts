export default class Slotarr {
  $amountToggler: HTMLInputElement
  $seedText: HTMLTextAreaElement
  $resultArea: HTMLDivElement
  $execute: HTMLButtonElement
  defaultSlotAmount: number

  constructor() {
    this.$amountToggler = document.querySelector('#amount') as HTMLInputElement
    this.$seedText = document.querySelector('#text') as HTMLTextAreaElement
    this.$resultArea = document.querySelector('#panel') as HTMLDivElement
    this.$execute = document.querySelector('#apply') as HTMLButtonElement
    this.defaultSlotAmount = 3
  }

  get idx() {
    return Math.floor(Math.random() * this.slotAmount)
  }

  get isSameAmountOfItemToSlot() {
    return this.$amountToggler.checked
  }

  get seedArray() {
    return this.$seedText.value.split(' ')
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
    this.$resultArea.textContent = array.join(' / ')
  }

  dispatch() {
    this.$execute.addEventListener('click', (ev: Event) => {
      this.setResult(this.shuffledArray)
    })
  }
}