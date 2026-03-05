import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Reaproveitando as interfaces que criamos no componente
import { DetalhesViagem, RelatorioFinanceiro, RankingMotorista } from '../pages/relatorios/relatorios';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  
  // Substitua pela URL real do seu backend
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  // Busca a View v_detalhes_viagem
  getDetalhesViagens(): Observable<DetalhesViagem[]> {
    return this.http.get<DetalhesViagem[]>(`${this.apiUrl}/relatorios/viagens`);
  }

  // Busca a View v_relatorio_financeiro_viagem
  getRelatoriosFinanceiros(): Observable<RelatorioFinanceiro[]> {
    return this.http.get<RelatorioFinanceiro[]>(`${this.apiUrl}/relatorios/financeiro`);
  }

  // Busca a View v_ranking_motoristas
  getRankingMotoristas(): Observable<RankingMotorista[]> {
    return this.http.get<RankingMotorista[]>(`${this.apiUrl}/relatorios/ranking-motoristas`);
  }
}