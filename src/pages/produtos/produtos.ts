import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produtos.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtosService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.produtosService.findByCategoria(this.navParams.get('categoriaId'))
      .subscribe(response => {
        this.items = response['content'];
      }, error => {});
  }

}
