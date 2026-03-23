<script setup></script>

<template>
    <div class="intro-liste">
        <div class="intro-liste-titre">
            <p class="intro-liste-titre__text">Les restos</p>
            <img class="intro-liste-titre__logo" src="/img/tmv.png" />
        </div>
        <div class="intro-liste-text">
            <p class="intro-liste-text__text">
                Envie de voyager (surtout dans votre assiette) ?
                <br />
                TMV vous écrit au dos d'une carte postale dénichée dans un quartier de Tours. Du
                bistrot généreux à la petite table secrète, on vous partage nos bons plans et
                chroniques resto pour vous faire découvrir les adresses sympas et gourmandes de la
                ville.
                <br />
                Glissez ce mot dans votre poche,<br />votre prochaine escale est ici !
            </p>
        </div>
        <div class="intro-liste-badge">
            <img src="/img/badge-coeur-tmv.svg" />
        </div>
    </div>
</template>

<style scoped>
.intro-liste {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: -10px;
    align-self: stretch;
}

.intro-liste-titre {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    width: 283.948px;
    height: 50px;
    transform: rotate(-3.2deg);
    padding: 4px 8px 0 8px;
    flex-shrink: 0;

    border-radius: 10px;
    background: #fff;
    box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1);

    margin-bottom: -16px;
    z-index: 1;
}

.intro-liste-titre__text {
    display: flex;
    align-items: center;

    color: #e815b2;
    font-family: Lalezar;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 46px;
}

.intro-liste-titre__logo {
    width: 78.26px;
    height: 33.016px;
    transform: rotate(4.934deg);
    aspect-ratio: 64/27;
}

.intro-liste-text {
    display: flex;
    padding: 26px 16px 16px 16px;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    border-radius: 15px;
    border: 2px dashed #e815b2;
    background: #fff;
}

.intro-liste-text__text {
    align-self: stretch;

    color: #000;
    font-family: Abordage;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
}

.intro-liste-badge {
    display: flex;
    padding: 3px 3px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
    align-self: stretch;
    margin-top: -60px;
    margin-bottom: -20px;
}
</style>
