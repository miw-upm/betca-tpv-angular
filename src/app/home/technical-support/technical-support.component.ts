import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from '@angular/material/sort';
import {ChatSearch} from "./chat-search.model";
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-technical-support',
  templateUrl: 'technical-support.component.html',
  styleUrls: ['technical-support.component.css']
})
export class TechnicalSupportComponent implements AfterViewInit {
  chatSearch: ChatSearch = {};
  chats = [
    {
      id: '1',
      name: 'Jorge García Rodríguez',
      lastMessage: {
        author: 'You', content: 'Esto es un ejemplo de un mensaje muy largo para ver si esto funciona a la' +
          ' hora de recortarlo o no ya que si no se haría la tabla muy muy grande.', lastMessageDate: new Date()
      },
      avatar: 'assets/images/user.png',
      hasNewMessage: true,
      productId: 134341
    },
    {
      id: '2',
      name: 'Marta García Rodríguez',
      lastMessage: {author: 'Marta', content: '...', lastMessageDate: new Date()},
      avatar: 'assets/images/user.png',
      hasNewMessage: true,
      productId: 434
    },
    {
      id: '3',
      name: 'Luisa García Rodríguez',
      lastMessage: {author: 'Luisa', content: '...', lastMessageDate: new Date()},
      avatar: 'assets/images/user.png',
      hasNewMessage: false,
      productId: 1343
    },
    {
      id: '4',
      name: 'Pablo García Rodríguez',
      lastMessage: {author: 'Pablo', content: '...', lastMessageDate: new Date()},
      avatar: 'assets/images/user.png',
      hasNewMessage: false,
      productId: 1343
    },
    {
      id: '5',
      name: 'María García Rodríguez',
      lastMessage: {author: 'María', content: 'Tengo un problema...', lastMessageDate: new Date()},
      avatar: 'assets/images/user.png',
      hasNewMessage: false,
      productId: 134
    },
    {
      id: '6',
      name: 'Josefa García Rodríguez',
      lastMessage: {author: 'Josefa', content: 'Información sobre un producto', lastMessageDate: new Date()},
      avatar: 'assets/images/user.png',
      hasNewMessage: false,
      productId: 453543
    },
    {
      id: '7',
      name: 'Hugo García Rodríguez',
      lastMessage: {author: 'Hugo', content: 'Necesito una factura', lastMessageDate: new Date()},
      avatar: 'assets/images/user.png',
      hasNewMessage: false,
      productId: 46656
    },
    {
      id: '8',
      name: 'Rodri García Rodríguez',
      lastMessage: {author: 'Rodri', content: '...', lastMessageDate: new Date()},
      avatar: 'assets/images/user.png',
      hasNewMessage: false,
      productId: 756765
    }
  ];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[];
  role: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.dataSource.data = this.chats;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.role = data['roles'][0];
      console.log(this.role);
      this.adjustDisplayedColumnsBasedOnRole(this.role);
    });
  }

  adjustDisplayedColumnsBasedOnRole(role: string) {
    if (role === 'CUSTOMER') {
      this.displayedColumns = ['productId', 'lastMessage', 'lastMessageDate', 'delete'];
    } else {
      this.displayedColumns = ['avatar', 'name', 'lastMessage', 'lastMessageDate', 'delete'];
    }
  }

  search(): void {
    //this.chats = this.chatsService.search(this.chatSearch);
  }

  delete(element) {
    //borrado
  }

  openChat(chatId: string): void {
    this.router.navigate(['/home', 'chat', chatId]);
  }


  resetSearch() {
    this.chatSearch = {};
  }
}
