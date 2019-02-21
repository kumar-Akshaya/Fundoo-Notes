import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from '../../service/note-service.service';
import { MatSnackBar } from '@angular/material';
import { getPlayers } from '@angular/core/src/render3/players';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

   isDeleted = false;

  private accessToken = localStorage.getItem('token');
  constructor(private noteService: NoteServiceService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  @Input() color;
  @Output() colorEmit = new EventEmitter();
  @Output() colorchange = new EventEmitter();
  @Output() childObject = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  // @Input () delete;
  @Input() card: any;
  colorArray = [[{ 'color': '#FFFFFF', 'name': 'White' },
  { 'color': '#E53935', 'name': 'Red' },
  { 'color': '#EF6C00', 'name': 'Orange' },
  { 'color': '#FFEB3B', 'name': 'Yellow' }],

  [{ 'color': '#B2FF59', 'name': 'green' },
  { 'color': '#69F0AE', 'name': 'teal' },
  { 'color': '#81D4FA', 'name': 'blue' },
  { 'color': '#0288D1', 'name': 'darkblue' }],

  [{ 'color': '#B39DDB', 'name': 'purple' },
  { 'color': '#F48FB1', 'name': 'pink' },
  { 'color': '#FFAB40', 'name': 'brown' },
  { 'color': '#E0E0E0', 'name': 'gray' }

  ]]

  colorsEdit(id) {
    console.log(id);
    this.colorEmit.emit(id)
    if (this.color != undefined) {
      this.card.type = 'color'
     
      this.noteService.postcolor({
        "color": id,
        "noteIdList": [this.color.id]
      }).subscribe(data => {
        console.log("color event reached ",data)
        localStorage.setItem('colorId', this.color.id)
        this.colorchange.emit({

        })
      })
    }
  }
  
  

  deleteNote(card) {
    this.isDeleted= !this.isDeleted;
    console.log("isDeleted", this.isDeleted);
    console.log('deletino', card);
    console.log("noteIdList",card.id)
    this.noteService.postTrash({
      "isDeleted": true,
     " noteIdList": card.id,
    
    }).subscribe(dataTrash =>{
     console.log("deleted responce", dataTrash);
     this.childObject.emit(card);
    },
    err =>
    {
     alert('Error occured')
    })

  }

  message = "Note Archieved ";
  action = "Undo";

  archive(message: string, action: string) {
    this.snackBar.open(this.message, this.action), {
      duration: 4000
    }
  }
  // deleteCard(noteObject) {
   
  //   console.log(this.isDeleted)
  //   console.log("note object", noteObject);
  //   noteObject.type = 'delete';
  //   this.childObject.emit(noteObject);


  //   this.noteService.postTrash(
  //     {
  //       "isArchived": true,
  //       "isDeleted":  this.isDeleted,
  //       "isPined": false,
  //       "noteIdList": [noteObject.id]
  //     }).subscribe(data => {
  //       console.log("trash responce", data);
  //       this.childObject.emit(noteObject);
  //     }, err => {
  //       console.log("delete responance", err);
  //     })
  // }

}










