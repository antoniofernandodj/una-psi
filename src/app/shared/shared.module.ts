import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BrandIconComponent } from "./components/brand-icon.component";
import { ImageCropperComponent } from "./components/image-cropper.component";
import { ThemeToggleComponent } from "./components/theme-toggle.component";
import { CoverUploadComponent } from "./components/form/cover-upload.component";
import { AvatarComponent } from "./components/avatar.component";
import { BadgeComponent } from "./components/badge.component";
import { ButtonComponent } from "./components/button.component";
import { CardComponent } from "./components/card.component";
import { ChipComponent } from "./components/chip.component";
import { EmptyStateComponent } from "./components/empty-state.component";
import { FooterComponent } from "./components/footer.component";
import { HeaderComponent } from "./components/header.component";
import { IconComponent } from "./components/icon.component";
import { LogoComponent } from "./components/logo.component";
import { MainLayoutComponent } from "./components/main-layout.component";
import { ModalComponent } from "./components/modal.component";
import { PasswordMeterComponent } from "./components/password-meter.component";
import { ProfileFieldsComponent } from "./components/profile-fields.component";
import { PriceComponent } from "./components/price.component";
import { SectionTitleComponent } from "./components/section-title.component";
import { SegmentedComponent } from "./components/segmented.component";
import { SocialLinksComponent } from "./components/social-links.component";
import { StatCardComponent } from "./components/stat-card.component";
import { TabsComponent } from "./components/tabs.component";
import { ToastHostComponent } from "./components/toast-host.component";
import { CheckboxComponent } from "./components/form/checkbox.component";
import { ChipSelectComponent } from "./components/form/chip-select.component";
import { FieldComponent } from "./components/form/field.component";
import { InputComponent } from "./components/form/input.component";
import { PhotoUploadComponent } from "./components/form/photo-upload.component";
import { SelectComponent } from "./components/form/select.component";
import { TagPickerComponent } from "./components/form/tag-picker.component";
import { TextareaComponent } from "./components/form/textarea.component";

const COMPONENTS = [
  AvatarComponent, BadgeComponent, ButtonComponent, CardComponent, ChipComponent, EmptyStateComponent,
  FooterComponent, HeaderComponent, IconComponent, LogoComponent, MainLayoutComponent, ModalComponent,
  PasswordMeterComponent, PriceComponent, ProfileFieldsComponent, SectionTitleComponent, SegmentedComponent, SocialLinksComponent,
  StatCardComponent, TabsComponent, ToastHostComponent,
  CheckboxComponent, ChipSelectComponent, FieldComponent, InputComponent, PhotoUploadComponent,
  SelectComponent, TagPickerComponent, TextareaComponent,
  BrandIconComponent, ImageCropperComponent, ThemeToggleComponent, CoverUploadComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ...COMPONENTS],
})
export class SharedModule {}
