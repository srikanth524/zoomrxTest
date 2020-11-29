
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'zoomrx-task';
  cardTitle: string;
  date= new Date();
  displayList = [
    {
      list: 'list0',
      cards: [],
    },
  ];
  listIndex: any;
  cardIndex: any;
  cardComments: any;

  ngOnInit() { }


  profileForm = new FormGroup({
    cardTitle: new FormControl(''),
    comment: new FormControl(''),
  });

  addNewList() {
    this.displayList.push({
      list: 'list' + this.displayList.length,
      cards: [],
    });
  }
  drag(ev, li, ci) {
    ev.dataTransfer.setData('CI', ci);
    ev.dataTransfer.setData('LI', li);
  }
  drop(ev, i) {
    ev.preventDefault();
    const CI = ev.dataTransfer.getData('CI');
    const LI = ev.dataTransfer.getData('LI');
    const cName = this.displayList[LI].cards[CI].cardName;
    this.displayList[i].cards.push({
      cardName: cName,
    });
    this.displayList[LI].cards.splice(CI, 1);
  }
  deleteList(index) {
    this.displayList.splice(index, 1);
  }
  addNewCard(index) {
    this.displayList[index].cards.push({
      cardName: this.profileForm.get('cardTitle').value,
      comments: [],
    });
    this.listIndex = index;
    this.cardIndex = this.displayList[index].cards.length - 1;
    this.profileForm.reset();
    this.cardComments = [];
  }
  allowDrop(ev) {
    ev.preventDefault();
  }
  deleteCard() {
    this.displayList[this.listIndex].cards.splice(this.cardIndex, 1);
  }
  editCard(listIndex, cardIndex) {
    this.profileForm.reset();
    this.profileForm
      .get('cardTitle')
      .setValue(this.displayList[listIndex].cards[cardIndex].cardName);
    this.listIndex = listIndex;
    this.cardIndex = cardIndex;
    this.cardComments = this.displayList[listIndex].cards[cardIndex].comments;
  }
  saveCardsDetails() {
    const index = this.displayList[this.listIndex].cards.length - 1;
    this.displayList[this.listIndex].cards[
      index
    ].cardName = this.profileForm.get('cardTitle').value;
    this.profileForm.get('cardTitle').setValue('');
  }
  getComments() {
    let commentValue = this.profileForm.get('comment').value;
    this.displayList[this.listIndex].cards[this.cardIndex].comments.push({
      comments: commentValue,
    });
    this.cardComments = this.displayList[this.listIndex].cards[
      this.cardIndex
    ].comments;
    this.profileForm.reset();
  }
}
