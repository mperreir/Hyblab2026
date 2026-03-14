<template>
    <header class="nrco-header" id="header" role="banner">
        <div class="block-icons">
            <!-- Left: Menu + Logo -->
            <div class="mode-menu">
                <div class="menu-scroll">
                    <button class="btn-transparent menu-btn" type="button" aria-label="Menu">
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 32 32"
                        >
                            <title>Menu</title>
                            <path
                                d="M4.267 16c0-0.589 0.478-1.067 1.067-1.067h21.333c0.589 0 1.067 0.478 1.067 1.067s-0.478 1.067-1.067 1.067h-21.333c-0.589 0-1.067-0.478-1.067-1.067z"
                            ></path>
                            <path
                                d="M4.267 8c0-0.589 0.478-1.067 1.067-1.067h21.333c0.589 0 1.067 0.478 1.067 1.067s-0.478 1.067-1.067 1.067h-21.333c-0.589 0-1.067-0.478-1.067-1.067z"
                            ></path>
                            <path
                                d="M4.267 24c0-0.589 0.478-1.067 1.067-1.067h21.333c0.589 0 1.067 0.478 1.067 1.067s-0.478 1.067-1.067 1.067h-21.333c-0.589 0-1.067-0.478-1.067-1.067z"
                            ></path>
                        </svg>
                        <span class="menu-label">Menu</span>
                    </button>
                </div>
                <div class="logo-img">
                    <a href="https://www.lanouvellerepublique.fr/">
                        <img
                            alt="La Nouvelle République"
                            loading="lazy"
                            width="220"
                            height="65"
                            decoding="async"
                            src="https://www.lanouvellerepublique.fr/_next/static/svg/logo.3ee3466abe0d1c7768b5df3ee595f280.svg"
                        />
                    </a>
                </div>
            </div>
            <!-- Right: Search, Login, Journal, S'abonner -->
            <div class="block-compte">
                <div class="login-btn-wrap">
                    <button class="btn-transparent" type="button" aria-label="S'identifier">
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 32 32"
                        >
                            <title>Gestionnaire</title>
                            <path
                                d="M5.641 20.808c1.2-1.2 2.828-1.875 4.525-1.875h10.667c1.697 0 3.325 0.674 4.525 1.875 0 0 0 0 0 0zM5.641 20.808c0 0-0 0-0 0-1.2 1.2-1.875 2.828-1.875 4.525v2.667c0 0.589 0.478 1.067 1.067 1.067s1.067-0.478 1.067-1.067v-2.667c0-1.132 0.45-2.217 1.25-3.017h0c0.8-0.8 1.885-1.25 3.017-1.25h10.667c1.132 0 2.217 0.449 3.017 1.25h0c0.8 0.8 1.25 1.885 1.25 3.017v2.667c0 0.589 0.478 1.067 1.067 1.067s1.067-0.478 1.067-1.067v-2.667c0-1.697-0.674-3.325-1.875-4.525z"
                            ></path>
                            <path
                                d="M9.1 9.333c0-3.535 2.865-6.4 6.4-6.4s6.4 2.865 6.4 6.4-2.865 6.4-6.4 6.4c-3.535 0-6.4-2.865-6.4-6.4zM15.5 5.067c-2.356 0-4.267 1.91-4.267 4.267s1.91 4.267 4.267 4.267c2.356 0 4.267-1.91 4.267-4.267s-1.91-4.267-4.267-4.267z"
                            ></path>
                        </svg>
                        <span class="sr-only">S'identifier</span>
                    </button>
                </div>
                <div class="btn-papier">
                    <a href="https://www.lanouvellerepublique.fr/kiosque" class="lien-link">
                        <span class="lien-icon-container">
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 32 32"
                            >
                                <title>Papier</title>
                                <path
                                    d="M1.6 2.667c0-0.589 0.478-1.067 1.067-1.067h19.363c0.589 0 1.067 0.478 1.067 1.067v22.527c0 0.589-0.478 1.067-1.067 1.067s-1.067-0.478-1.067-1.067v-21.46h-17.229v23.684h20.954c0.589 0 1.067 0.478 1.067 1.067s-0.478 1.067-1.067 1.067h-22.020c-0.589 0-1.067-0.478-1.067-1.067v-25.817z"
                                ></path>
                                <path
                                    d="M21.089 8.994c0-0.589 0.478-1.067 1.067-1.067h7.087c0.589 0 1.067 0.478 1.067 1.067v15.946c0 2.487-2.123 4.61-4.61 4.61-2.639 0-4.61-2.148-4.61-4.61v-15.946zM23.223 10.061v14.879c0 1.334 1.066 2.477 2.477 2.477 1.309 0 2.477-1.168 2.477-2.477v-14.879h-4.954z"
                                ></path>
                                <path
                                    d="M5.333 17.333c0-0.589 0.478-1.067 1.067-1.067h12c0.589 0 1.067 0.478 1.067 1.067s-0.478 1.067-1.067 1.067h-12c-0.589 0-1.067-0.478-1.067-1.067z"
                                ></path>
                                <path
                                    d="M5.333 22.667c0-0.589 0.478-1.067 1.067-1.067h12c0.589 0 1.067 0.478 1.067 1.067s-0.478 1.067-1.067 1.067h-12c-0.589 0-1.067-0.478-1.067-1.067z"
                                ></path>
                                <path
                                    d="M5.333 6.667c0-0.589 0.478-1.067 1.067-1.067h12c0.589 0 1.067 0.478 1.067 1.067v5.333c0 0.589-0.478 1.067-1.067 1.067h-12c-0.589 0-1.067-0.478-1.067-1.067v-5.333zM7.467 7.733v3.2h9.867v-3.2h-9.867z"
                                ></path>
                            </svg>
                        </span>
                    </a>
                </div>
                <div class="btn-abonner">
                    <a href="https://www.lanouvellerepublique.fr/abonnements" class="btn-abo">
                        <span>S'abonner</span>
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
/* ── Header wrapper ── */
.nrco-header {
    position: fixed;
    inset: 0 0 auto 0;
    display: block;
    width: 100%;
    align-items: center;
    background: #fff;
    border-bottom: 0.1rem solid #c8c8c8;
    z-index: 4000;
    transform: translateZ(0);
    backface-visibility: hidden;
    font-family: "Open Sans", sans-serif;
}

/* ── Block icons (main flex row) ── */
.block-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: padding 0.3s ease-in-out;
    padding: 15px 20px;
}

@media (max-width: 1199.98px) {
    .block-icons {
        padding: 5px 5px 0;
    }
}

/* ── Left side: menu + logo ── */
.mode-menu {
    order: -1;
    display: flex;
    gap: 40px;
}

@media (max-width: 767.98px) {
    .mode-menu {
        gap: 10px;
    }
}

.menu-btn {
    flex-direction: column !important;
    align-items: center;
}

.mode-menu button {
    padding: 0;
    margin-top: 10px;
}

.mode-menu button .menu-label {
    color: #222;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: normal;
}

/* ── Logo ── */
.logo-img {
    height: 60px;
}

.logo-img a {
    display: block;
}

.logo-img img {
    transition: all 0.3s ease-in-out;
}

@media (max-width: 1199.98px) {
    .logo-img img {
        width: 150px;
        height: 45px;
        margin-top: 10px;
    }
}

@media (max-width: 991.98px) {
    .logo-img img {
        width: 120px;
        height: 30px;
        margin-top: 15px;
    }
}

/* ── Right side: account block ── */
.block-compte {
    display: flex;
    align-items: center;
    gap: 16px;
}

.block-compte > div {
    display: flex;
    align-items: center;
}

/* ── Common transparent button ── */
.btn-transparent {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: transparent;
    color: #222;
    border: 0;
    padding: 0;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5rem;
    text-decoration: none;
}

.btn-transparent svg {
    width: auto;
    margin-right: 2px;
    height: 1.5rem;
    flex: 0 0 auto;
}

@media (min-width: 768px) {
    .btn-transparent:focus,
    .btn-transparent:hover {
        color: #ce181e;
    }
    .btn-transparent:focus svg,
    .btn-transparent:hover svg {
        fill: #ce181e;
    }
}

/* ── Search button ── */
.search-btn-wrap {
    display: none;
}

@media (min-width: 768px) {
    .search-btn-wrap {
        display: block;
    }
}

.search-btn-wrap button {
    padding: 0;
}

.search-btn-wrap button svg {
    margin-top: 0;
    width: 24px;
}

@media (min-width: 1200px) {
    .search-btn-wrap button svg {
        height: 24px;
    }
}

.search-btn-wrap button .sr-only {
    color: #4d4d4d;
    font-weight: 400;
}

/* ── Login button ── */
.login-btn-wrap button {
    padding: 0;
}

@media (max-width: 1199.98px) {
    .login-btn-wrap button {
        padding: 0;
    }
}

.login-btn-wrap button svg {
    margin-top: 0;
    width: 24px;
    height: 24px;
}

@media (min-width: 1200px) {
    .login-btn-wrap button svg {
        height: 24px;
    }
}

.login-btn-wrap button .sr-only {
    color: #4d4d4d;
    font-weight: 400;
}

@media (min-width: 768px) {
    .login-btn-wrap:hover button .sr-only {
        color: #ce181e;
    }
    .login-btn-wrap:hover svg {
        fill: #ce181e;
    }
}

/* ── Screen reader only text ── */
.sr-only {
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    position: absolute;
}

/* ── Papier desktop ── */
.btn-papier {
    display: block;
}

@media (max-width: 991.98px) {
    .btn-papier {
        display: none;
    }
}

@media (min-width: 768px) {
    .btn-papier:hover svg {
        fill: #ce181e;
    }
    .btn-papier:hover span {
        color: #ce181e;
    }
}

/* ── Papier mobile ── */
.btn-papier-mobile {
    display: none;
}

@media (max-width: 991.98px) {
    .btn-papier-mobile {
        display: block;
    }
}

@media (min-width: 768px) {
    .btn-papier-mobile:hover svg {
        fill: #ce181e;
    }
    .btn-papier-mobile:hover span {
        color: #ce181e;
    }
}

/* ── Lien link (journal link) ── */
.lien-link {
    color: #4d4d4d;
    text-decoration: none !important;
    line-height: 1.5;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
}

.lien-link svg {
    margin-top: 0;
    vertical-align: middle;
}

.lien-link:focus,
.lien-link:hover {
    color: #ce181e;
}

.lien-icon-container {
    margin-right: 10px;
    display: inline-flex;
    align-items: center;
}

/* ── S'abonner button ── */
.btn-abonner {
    min-width: 105px;
}

.btn-abo {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 0.7rem;
    border: 0.1rem solid transparent;
    border-radius: 0.4rem;
    font-size: 1rem !important;
    font-weight: 700;
    line-height: 1.5rem;
    text-decoration: none !important;
    background: #f1c84b;
    color: #222;
    cursor: pointer;
}

@media (min-width: 768px) {
    .btn-abo:hover {
        background: #e6b13f;
        color: #222;
    }
}

.btn-abo:focus {
    background: #e6b13f;
    color: #222;
}

/* ── Menu scroll area (hidden on desktop) ── */
@media (min-width: 1200px) {
    .menu-scroll {
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.1s ease-out;
    }
}
</style>
