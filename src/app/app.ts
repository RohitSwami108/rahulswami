import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ArchitecturalSpineComponent } from './components/architectural-spine/architectural-spine.component';
import { ContactSectionComponent } from './components/contact/contact.component';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { ExperienceSkillsComponent } from './components/experience-skills/experience-skills.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { MaterialLightingStudioComponent } from './components/material-lighting-studio/material-lighting-studio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectGalleryComponent } from './components/project-gallery/project-gallery.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { RenderVaultModalComponent } from './components/render-vault-modal/render-vault-modal.component';
import { ServicesComponent } from './components/services/services.component';
import { SignatureRevealComponent } from './components/signature-reveal/signature-reveal.component';
import { VisualizerStudioComponent } from './components/visualizer-studio/visualizer-studio.component';
import { Project } from './models/portfolio.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SignatureRevealComponent,
    CustomCursorComponent,
    ArchitecturalSpineComponent,
    NavbarComponent,
    HeroComponent,
    ProjectGalleryComponent,
    VisualizerStudioComponent,
    ExperienceSkillsComponent,
    MaterialLightingStudioComponent,
    ServicesComponent,
    ContactSectionComponent,
    FooterComponent,
    ProjectModalComponent,
    RenderVaultModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  selectedProject = signal<Project | null>(null);
  isVaultOpen = signal(false);

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeProjectModal(): void {
    this.selectedProject.set(null);
    if (!this.isVaultOpen() && typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  openVault(): void {
    this.isVaultOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeVault(): void {
    this.isVaultOpen.set(false);
    if (!this.selectedProject() && typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
