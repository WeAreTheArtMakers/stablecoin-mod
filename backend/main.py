from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import reserve, mint, burn

app = FastAPI(
    title="Algorithmic Stablecoin API",
    description="API for interacting with the stablecoin system, managing reserves, and handling mint/burn requests.",
    version="1.0.0"
)

# CORS Ayarları
# Frontend'in (Next.js) bu API'ye erişebilmesi için gereklidir.
origins = [
    "http://localhost:3000",  # Next.js development server
    # Gelecekte deploy edilecek production URL'si de eklenebilir.
    # "https://your-frontend-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router'ları uygulamaya dahil et
app.include_router(reserve.router, prefix="/api", tags=["Reserve"])
app.include_router(mint.router, prefix="/api", tags=["Mint"])
app.include_router(burn.router, prefix="/api", tags=["Burn"])

@app.get("/", tags=["Root"])
async def read_root():
    """
    API'nin çalışıp çalışmadığını kontrol etmek için basit bir hoş geldiniz endpoint'i.
    """
    return {"message": "Welcome to the Stablecoin API!"}
