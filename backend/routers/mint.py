from fastapi import APIRouter, HTTPException
from ..models.reserve_model import MintRequest, TransactionResponse
import uuid

router = APIRouter()

@router.post("/mint-request", response_model=TransactionResponse)
async def request_mint(request: MintRequest):
    """
    Kullanıcının fiat para yatırması karşılığında yeni token mint etme isteği.

    Bu fonksiyon, bir ödeme ağ geçidinden onay aldıktan sonra,
    sistemin akıllı kontratını çağırarak kullanıcıya token mint etmelidir.
    Bu örnekte, işlem başarılı varsayılır ve sahte bir tx hash'i üretilir.
    """
    print(f"Mint isteği alındı: {request.amount_usd} USD için {request.user_wallet_address} adresine.")

    try:
        # 1. Ödeme ağ geçidinden onayı kontrol et (Simülasyon)
        # payment_confirmed = await check_payment_gateway(request.transaction_id)
        # if not payment_confirmed:
        #     raise HTTPException(status_code=400, detail="Ödeme onayı alınamadı.")

        # 2. Akıllı kontratı çağırarak token mint et (Simülasyon)
        # tx_hash = await contract_service.mint_tokens(request.user_wallet_address, request.amount_usd)
        
        # Sahte bir işlem hash'i üret
        tx_hash = f"0x{uuid.uuid4().hex}{uuid.uuid4().hex[:32]}"

        print(f"İşlem başarılı. Sahte Tx Hash: {tx_hash}")

        return TransactionResponse(
            success=True,
            message=f"{request.amount_usd} STB token başarıyla mint edildi ve {request.user_wallet_address} adresine gönderildi.",
            transaction_hash=tx_hash
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Mint işlemi sırasında bir hata oluştu: {str(e)}"
        )
