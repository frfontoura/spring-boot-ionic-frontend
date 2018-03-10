import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { PedidoService } from '../../services/domain/pedido.service';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoService } from '../../services/domain/produtos.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-meus-pedidos',
  templateUrl: 'meus-pedidos.html',
})
export class MeusPedidosPage {

  pedidos: PedidoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidoService: PedidoService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    this.pedidoService.findAll(this.page, 2)
      .subscribe(response => {
        this.pedidos = this.pedidos.concat(response['content']);
        this.loadImageUrls();
      }, error => {  });
  }

  loadImageUrls() {
    this.pedidos.forEach(p => {
      p.itens.forEach(i => {
        this.produtoService.getSmallImageFromBucket(i.produto.id)
          .subscribe(response => {
            (i.produto as ProdutoDTO).imageUrl =  `${API_CONFIG.bucketBaseUrl}/prod${i.produto.id}-small.jpg`;
          }, error => {});
        })
    });
  }

  doRefresh(refresher) {
    this.page = 0;
    this.pedidos = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}
