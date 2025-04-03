terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }

  backend "azurerm" {
    resource_group_name   = "tableeghi-community-rg"
    storage_account_name  = "tableeghi123storage"
    container_name        = "tfstate"
    key                   = "terraform.tfstate"
    subscription_id       = "87d10d0e-bffd-47ad-ae5a-df0a89ed0807"
  }
}

provider "azurerm" {
  features {}
  subscription_id = "87d10d0e-bffd-47ad-ae5a-df0a89ed0807"
}

resource "azurerm_resource_group" "tableeghi_rg" {
  name     = "tableeghi-community-rg"
  location = "East US"
}

resource "azurerm_static_site" "tableeghi_app" {
  name                = "tableeghi-app"
  resource_group_name = azurerm_resource_group.tableeghi_rg.name
  location            = azurerm_resource_group.tableeghi_rg.location

  sku_tier = "Free"
  sku_size = "Free"
}

output "static_web_app_url" {
  value = azurerm_static_site.tableeghi_app.default_host_name
}
