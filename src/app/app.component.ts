import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  @ViewChild('paypal', { static: true }) paypalElement! : ElementRef;


  producto = {
    descripcion: 'Poco X4 GT',
    precio: 4999.99,
    img : 'imagen del producto'
  }

  title = 'PaypalAPI';


  ngOnInit(): void {
    paypal.Buttons({
      createOrder: (data: any, actions:any ) => {
        return actions.order.create({
          purchase_units: [{
            description: this.producto.descripcion,
            amount: {
              currency_code: 'MXN',
              value: this.producto.precio
            }
          }]
        })
      },
      onApprove: async (data:any , actions:any ) => {
        const order = await actions.order.capture();
        console.log(order);
      },
      onError: (err:any) =>{
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
  }
}
