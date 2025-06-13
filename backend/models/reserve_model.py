from pydantic import BaseModel, Field

class ReserveStatus(BaseModel):
    """
    Sistem rezervlerinin durumunu temsil eden model.
    """
    total_reserve_usd: float = Field(..., description="Rezervdeki toplam varlıkların USD cinsinden değeri.")
    total_supply_stb: float = Field(..., description="Dolaşımdaki toplam StableToken (STB) miktarı.")
    collateral_ratio: float = Field(..., description="Teminatlandırma oranı (Total Reserve / Total Supply).")

class MintRequest(BaseModel):
    """
    Yeni token mint etme isteği için model.
    """
    amount_usd: float = Field(..., gt=0, description="Yatırılan ve karşılığında token mint edilecek USD miktarı.")
    user_wallet_address: str = Field(..., description="Token'ların gönderileceği kullanıcının cüzdan adresi.")

class BurnRequest(BaseModel):
    """
    Token yakma isteği için model.
    """
    amount_stb: float = Field(..., gt=0, description="Yakılacak olan StableToken (STB) miktarı.")
    user_wallet_address: str = Field(..., description="Token'ları yakan kullanıcının cüzdan adresi.")

class TransactionResponse(BaseModel):
    """
    Mint/Burn işlemleri sonrası dönülecek yanıt modeli.
    """
    success: bool
    message: str
    transaction_hash: str | None = None
