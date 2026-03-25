import './globals.css'
import SiteShell from '../components/SiteShell'
import { withBasePath } from '../lib/withBasePath'

export const metadata = {
    title: 'Equipe',
    description: 'Redécouvrez les legendes de la CDM à travers leurs interviews, et collectionné leurs cartes',
}


export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    themeColor: '#FAF7F4',
}

export default function RootLayout({ children }) {
    const iconHref = withBasePath('/icone/icone.png')
    const paperTextureUrl = withBasePath('/fonts/paper_texture.png')
    const antraciteTextureUrl = withBasePath('/fonts/Fond_antracite.png')
    const lequipeFontUrl = withBasePath('/typo/LEQUIPE.otf')
    const anekFontUrl = withBasePath('/typo/anek.ttf')
    const anekExpandedFontUrl = withBasePath('/fonts/AnekDevanagari_Expanded-ExtraBold.ttf')

    return (
        <html lang="fr">
            <head>
                <link rel="icon" href={iconHref} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <style>{`
          @font-face {
            font-family: 'LEQUIPE';
            src: url('${lequipeFontUrl}') format('opentype');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Anek';
            src: url('${anekFontUrl}') format('truetype');
            font-weight: 800;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'AnekExpanded';
            src: url('${anekExpandedFontUrl}') format('truetype');
            font-weight: 800;
            font-style: normal;
            font-display: swap;
          }

          :root {
            --paper-texture-url: url('${paperTextureUrl}');
            --antracite-texture-url: url('${antraciteTextureUrl}');
          }
        `}</style>
            </head>

            <body>
                <SiteShell>{children}</SiteShell>
            </body>
        </html>
    )
}
