from fastapi import APIRouter, HTTPException
from ..models.reserve_model import BurnRequest, TransactionResponse
import uuid

router = APIRouter()

@router.post("/burn-request", response_model=TransactionResponse)
async def request_burn(request: BurnRequest):
    """
    Kullanıcının stablecoin'lerini yakarak karşılığında fiat para talep etmesi.

    Bu fonksiyon, kullanıcının token'ları bir adrese gönderdiğini doğrulamalı,
    ardından token'ları yakmalı ve kullanıcıya fiat transferi başlatmalıdır.
    Bu örnekte, işlem başarılı varsayılır ve sahte bir tx hash'i üretilir.
    """
    print(f"Burn isteği alındı: {request.amount_stb} STB, {request.user_wallet_address} adresinden.")

    try:
        # 1. Kullanıcının token'ları yakan adrese transfer ettiğini doğrula (Simülasyon)
        # balance_confirmed = await contract_service.check_balance(request.user_wallet_address, request.amount_stb)
        # if not balance_confirmed:
        #     raise HTTPException(status_code=400, detail="Yetersiz bakiye veya transfer onayı yok.")

        # 2. Akıllı kontratı çağırarak token'ları yak (Simülasyon)
        # tx_hash = await contract_service.burn_tokens(request.user_wallet_address, request.amount_stb)
        
        # Sahte bir işlem hash'i üret
        tx_hash = f"0x{uuid.uuid4().hex}{uuid.uuid4().hex[:32]}"

        print(f"İşlem başarılı. Sahte Tx Hash: {tx_hash}")

        return TransactionResponse(
            success=True,
            message=f"{request.amount_stb} STB token başarıyla yakıldı. Fiat transferi başlatıldı.",
            transaction_hash=tx_hash
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Burn işlemi sırasında bir hata oluştu: {str(e)}"
        )
