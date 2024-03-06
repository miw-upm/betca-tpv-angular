import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  chatPartner = {name: 'Jorge García Rodríguez'};
  messages = [];
  newMessage = '';
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.messages = [
      {
        author: 'You',
        content: '¡Hola! ¿Cómo estás?',
        time: new Date(),
        showDate: true,
        type: 'text'
      },
      {
        author: 'Jorge García Rodríguez',
        content: '¡Hola! Bien, ¿y tú?',
        time: new Date(),
        showDate: false,
        type: 'text'
      },
      {
        author: 'You',
        content: 'Todo bien, gracias.',
        time: new Date(),
        showDate: false,
        type: 'text'
      },
      {
        author: 'Jorge García Rodríguez',
        content: undefined,
        imageUrl: 'assets/images/miw.png',
        time: new Date(),
        showDate: false,
        type: 'image'
      }
    ];
  }

  sendMessage(content: string = this.newMessage, type: 'text' | 'image' = 'text') {
    if (type === 'text' && !content.trim()) return;

    const newMessage = {
      author: 'You',
      content: type === 'text' ? content : undefined,
      imageUrl: type === 'image' ? content : undefined,
      time: new Date(),
      type: type,
      showDate: false,
    };

    this.messages.push(newMessage);

    if (type === 'text') {
      this.newMessage = '';
    }
  }

  handleFileInput(event: Event) {
    const element = event.target as HTMLInputElement;
    const files = element.files as FileList;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.sendMessage(e.target.result, 'image');
      };
      reader.readAsDataURL(file);
    }
  }


  goBack(): void {
    this.location.back();
  }

}
