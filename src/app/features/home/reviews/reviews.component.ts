import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  imports: [
    MatIcon,
    NgClass,
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews = [
    {
      article: {
        name: 'Pedido #1001',
        imageUrl: 'assets/img/pedido1001.png', // 示例图片路径
        description: 'Este es un producto de prueba con un diseño muy elegante.'
      },
      stars: 3,
      opinion: 'Me gustó bastante, aunque podría ser más barato.'
    },
    {
      article: {
        name: 'Pedido #1002',
        imageUrl: 'assets/img/pedido1002.png',
        description: 'Un producto de alta calidad, con gran resistencia y durabilidad.'
      },
      stars: 5,
      opinion: 'Excelente calidad, repetiré sin dudarlo.'
    },
    {
      article: {
        name: 'Pedido #1003',
        imageUrl: 'assets/img/pedido1003.png',
        description: 'Ideal para el día a día, combina funcionalidad y estilo.'
      },
      stars: 4,
      opinion: 'Buena relación calidad-precio.'
    }
  ];

  // 点击星星时更新评分
  rateProduct(review: any, stars: number) {
    review.stars = stars;
  }
}
