import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html'
})
export class SettingsComponent implements OnInit {
  
  // --- BARRA DE PESQUISA ---
  searchQuery = '';

  // --- DADOS DA TABELA DE VIAGENS ---
  trips = signal<any[]>([
    {
      id: 1,
      driverName: 'Carlos Almeida',
      dateTime: '2026-03-10T08:00',
      pickupPoint: 'Praça Central',
      dropoffPoint: 'Aeroporto Internacional',
      status: 'Agendada',
      pricePerKm: 2.50,
      tripName: 'Rota Centro - Aeroporto',
      reviews: [
        { id: 101, clientName: 'João Silva', rating: 5, comment: 'Motorista excelente e pontual!' },
        { id: 102, clientName: 'Maria Souza', rating: 4, comment: 'Viagem tranquila, recomendo.' }
      ]
    },
    {
      id: 2,
      driverName: 'Mariana Santos',
      dateTime: '2026-03-12T14:30',
      pickupPoint: 'Rodoviária',
      dropoffPoint: 'Shopping Sul',
      status: 'Cancelada',
      pricePerKm: 2.00,
      tripName: 'Rota Rodoviária - Sul',
      reviews: []
    }
  ]);

  // --- CONTROLES DOS MODAIS ---
  showReviewsModal = false;
  showEditTripModal = false;
  showDeleteTripModal = false;
  showAddTripModal = false;
  
  selectedTrip: any = null;
  
  newTrip: any = {
    driverName: '',
    dateTime: '',
    pickupPoint: '',
    dropoffPoint: '',
    status: 'Agendada',
    pricePerKm: 0
  };

  // Variáveis mantidas apenas para evitar erro no bloco HTML antigo (que você não excluiu)
  showDeleteModal = false;
  selectedJourney: any = null;

  ngOnInit() {
    // Local onde você chamará sua API no futuro
  }

  // ==========================================
  // FUNÇÕES DE ADICIONAR VIAGEM
  // ==========================================
  
  openAddTripModal() {
    this.newTrip = {
      driverName: '',
      dateTime: '',
      pickupPoint: '',
      dropoffPoint: '',
      status: 'Agendada',
      pricePerKm: 0
    };
    this.showAddTripModal = true;
  }

  saveNewTrip() {
    // Gera um ID temporário e salva na lista (Substituir pela API depois)
    const tripToSave = {
      id: Math.floor(Math.random() * 1000) + 100,
      tripName: `Rota ${this.newTrip.pickupPoint} - ${this.newTrip.dropoffPoint}`,
      reviews: [],
      ...this.newTrip
    };
    
    this.trips.update(list => [...list, tripToSave]);
    this.closeTripModals();
  }

  // ==========================================
  // FUNÇÕES DE VISUALIZAÇÃO, EDIÇÃO E EXCLUSÃO
  // ==========================================

  openReviewsModal(trip: any) {
    this.selectedTrip = trip;
    this.showReviewsModal = true;
  }

  deleteReview(reviewId: number) {
    const confirmacao = confirm('Tem certeza que deseja excluir esta avaliação?');
    
    if (confirmacao) {
      // 1. Remove da viagem que está aberta no modal
      this.selectedTrip.reviews = this.selectedTrip.reviews.filter((r: any) => r.id !== reviewId);
      
      // 2. Atualiza a lista principal (signal) para guardar a alteração
      this.trips.update(list => 
        list.map(t => t.id === this.selectedTrip.id ? this.selectedTrip : t)
      );
    }
  }

  openEditTripModal(trip: any) {
    this.selectedTrip = { ...trip }; // Cria uma cópia para não alterar a tabela antes de salvar
    this.showEditTripModal = true;
  }

  saveTripEdit() {
    this.trips.update(list => 
      list.map(t => t.id === this.selectedTrip.id ? this.selectedTrip : t)
    );
    this.closeTripModals();
  }

  openDeleteTripModal(trip: any) {
    this.selectedTrip = trip;
    this.showDeleteTripModal = true;
  }

  deleteTrip() {
    this.trips.update(list => list.filter(t => t.id !== this.selectedTrip.id));
    this.closeTripModals();
  }

  closeTripModals() {
    this.showReviewsModal = false;
    this.showEditTripModal = false;
    this.showDeleteTripModal = false;
    this.showAddTripModal = false;
    this.selectedTrip = null;
  }

  // Funções mantidas apenas para não quebrar o HTML antigo do "Excluir trecho"
  closeModals() {
    this.showDeleteModal = false;
  }
  deleteJourney() {
    this.showDeleteModal = false;
  }
}