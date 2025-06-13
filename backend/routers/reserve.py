from fastapi import APIRouter, HTTPException
from ..models.reserve_model import ReserveStatus
import random

router = APIRouter()

@router.get("/reserve", response_model=ReserveStatus)
async def get_reserve_status():
    """
    Sistem rezervlerinin mevcut durumunu döndürür.
    
    Bu fonksiyon, blockchain'den veya güvenilir bir kaynaktan veri almalıdır.
    Bu örnekte, test amacıyla sahte veriler üretilmektedir.
    """
    try:
        # --- SAHTE VERİ ÜRETİMİ ---
        # Gerçek bir uygulamada bu veriler akıllı kontratlardan okunmalıdır.
        # Örn: stableToken.totalSupply() ve stabilizer.getReserveValue()
        
        # Toplam arzı 10 milyon ile 12 milyon arasında rastgele belirle
        total_supply = random.uniform(10_000_000, 12_000_000)
        
        # Teminat oranını %105 ile %120 arasında rastgele belirle
        collateral_ratio = random.uniform(1.05, 1.20)
        
        # Toplam rezervi bu değerlere göre hesapla
        total_reserve = total_supply * collateral_ratio
        
        # --- SAHTE VERİ SONU ---

        return ReserveStatus(
            total_reserve_usd=total_reserve,
            total_supply_stb=total_supply,
            collateral_ratio=collateral_ratio
        )
    except Exception as e:
        # Gerçek bir hata yönetimi burada olmalı
        raise HTTPException(
            status_code=500, 
            detail=f"Rezerv bilgileri alınırken bir hata oluştu: {str(e)}"
        )
