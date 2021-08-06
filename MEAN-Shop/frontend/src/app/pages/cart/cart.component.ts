import { Component, DoCheck, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, DoCheck {

  cart!: Product[];

  /* cart: Product[] = [
    {
        "_id": "61098413aeed3955dc8f929a",
        "name": "Ratchet & Clank: Una Dimensión Aparte",
        "vendor": "PlayStation 5 Store",
        "description": "Los aventureros intergalácticos regresan a lo grande en Ratchet & Clank: Una Dimensión Aparte. Un malvado emperador robótico se ha lanzado a la conquista de mundos interdimensionales, y el universo de Ratchet y Clank es su próximo objetivo. Ábrete camino hacia tu hogar con un arsenal repleto de nuevas armas explosivas, incluyendo la Burst Pistol, el Topiary Sprinkler y la Shatterbomb. Surca el cielo de ciudades, lánzate al combate y salta de dimensión en dimensión con nuevos artefactos que desafían las leyes de la física. Experimenta los saltos intergalácticos por las brechas dimensionales, que combinan nuevos mundos y mecánicas de juego",
        "images": [
            "https://m.media-amazon.com/images/I/81NROu9kd-L._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81rukjpOkjL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81Au+hYKTfL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81E6mOFyM2L._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81+u97oQ0fL._AC_SL1500_.jpg"
        ],
        "price": 79.99,
        "discount": 21,
        "quantity": 1,
        "tags": [
            "ps5",
            "ps5 videojuegos",
            "playstation 5",
            "playstation 5 videojuegos",
            "ratchet & clank: una dimensión aparte",
            "ratchet and clank: una dimensión aparte",
            "una dimensión aparte",
            "ps5 ratchet & clank: una dimensión aparte",
            "ps5 ratchet & clank",
            "ps5 ratchet and clank",
            "playstation 5 ratchet & clank: una dimensión aparte",
            "playstation 5 ratchet & clank",
            "playstation 5 ratchet and clank"
        ],
        "createdAt": "2021-08-03T17:59:47.342Z",
        "updatedAt": "2021-08-04T16:49:19.742Z"
    },
    {
        "images": [
            "https://images-na.ssl-images-amazon.com/images/I/61RRViAYqdL.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/712Z7Cm1kUL.jpg"
        ],
        "quantity": 2,
        "discount": 5,
        "tags": [
            "libros",
            "libros de programación",
            "libros de programación para principiantes",
            "programación",
            "código limpio",
            "robert c martin"
        ],
        "_id": "6109272e0cb0e431d0ff73f9",
        "vendor": "",
        "name": "Código Limpio: Manual de estilo para el desarrollo ágil de software (Programación)",
        "description": "Cada año, se invierten innumerables horas y se pierden numerosos recursos debido a código mal escrito, ralentizando el desarrollo, disminuyendo la productividad, generando graves fallos e incluso pudiendo acabar con la organización o empresa. El reconocido experto de software Robert C. Martin, junto con sus colegas de Object Mentor, nos presentan sus óptimas técnicas y metodologías ágiles para limpiar el código sobre la marcha y crearlo de forma correcta, de este modo mejorará como programador. Esta obra se divide en tres partes. La primera describe los principios, patrones y prácticas para crear código limpio. La segunda incluye varios casos de estudio cuya complejidad va aumentando. Cada ejemplo es un ejercicio de limpieza y transformación de código con problemas. La tercera parte del libro contiene una lista de heurística y síntomas de código erróneo (smells) confeccionada al crear los casos prácticos. El resultado es una base de conocimientos que describe cómo pensamos cuando creamos, leemos y limpiamos código. Imprescindible para cualquier desarrollador, ingeniero de software, director de proyectos, jefe de equipo o analista de sistemas interesado en crear código de mejor calidad. ¡El libro que todo programador debe leer!",
        "price": 49.95,
        "createdAt": "2021-08-03T11:23:26.546Z",
        "updatedAt": "2021-08-04T09:56:39.896Z"
    },
    {
        "images": [
            "https://m.media-amazon.com/images/I/71Oip9i1g3S._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71gwF831NXS._AC_SL1500_.jpg"
        ],
        "quantity": 1,
        "discount": 0,
        "tags": [
            "ps5",
            "ps5 consola",
            "ps5 pack",
            "ps5 ratchet and clank",
            "playstation 5",
            "playstation 5 consola",
            "playstation 5 pack",
            "playstation 5 ratchet and clank"
        ],
        "_id": "61045e4ab5e162516c28f8d5",
        "vendor": "",
        "name": "PS5 & Ratchet & Clank",
        "description": "PlayStation 5 starter pack Ratchet and Clank",
        "price": 500,
        "createdAt": "2021-07-30T20:17:14.420Z",
        "updatedAt": "2021-08-04T09:55:40.148Z"
    }
]; */

  constructor( private cookiesSvc: AppCookiesService, private cartSvc: CartService ) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    this.cart = this.cartSvc.getCart();
  }

  ngOnDestroy(): void { }
    
  getTotalPrice(): number {
    if (!this.cart.length) return 0;
    return this.cart.map( e => e.price * ( (100 - e.discount) / 100 ) * e.quantity ).reduce( (e, acc) => e + acc );
  }

  emptyCart(): void {
    this.cartSvc.emptyCart();
  }
}
