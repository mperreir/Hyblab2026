import csv
import re
from collections import Counter

# File paths
input_csv = "/Users/mondestinpounga/Documents/Hyblab2026/vivant/db_clean.csv"
output_csv = "/Users/mondestinpounga/Documents/Hyblab2026/vivant/db_clean_tagged.csv"

# Define the categories
categories = [
    "Initiative personnelle/quotidienne",
    "Entrepreneuriat",
    "Collectifs",
    "Service publique"
]

# Keywords for each category
keywords = {
    "Entrepreneuriat": [
        "entrepreneuriat", "entreprise", "entreprises", "entrepreneur", "entrepreneurs", "start-up", "startup", 
        "business", "commerce", "commerces", "industrie", "industries", "artisan", "artisans", "chiffre d'affaires", 
        "commercial", "commerciaux", "fondateur", "fondateurs", "vendre", "vend", "client", "clients", "exploitation", "exploitations", "société", "sociétés",
        "pme", "brasserie", "brasseries", "économique", "rentabilité", "vente", "ventes", "magasin", "magasins",
        "agriculteur", "agriculteurs", "paysan", "paysans", "boulanger", "boulangers", "maraîcher", "maraîchers", "agriculture", 
        "agricole", "artisanat", "fabrication", "producteur", "producteurs", "salarié", "salariés"
    ],
    "Collectifs": [
        "collectif", "collectifs", "association", "associations", "tiers-lieu", "tiers-lieux", "fablab", "fablabs", "coopérative", "coopératives",
        "mutualisation", "mutualiser", "ensemble", "groupement", "groupements", "réseau", "réseaux", "club", "clubs",
        "bureau collégial", "solidaire", "solidaires", "groupe", "groupes", "amap", "partage", "collégial", "bénévole", "bénévoles", "bénévolat",
        "économie sociale et solidaire", "ess", "monnaie locale", "monnaies locales", "partenariat"
    ],
    "Service publique": [
        "service public", "services publics", "mairie", "mairies", "commune", "communes", "état", 
        "département", "départements", "région", "régions", "gouvernement", "ccas", "collectivité", "collectivités",
        "public", "publics", "publique", "publiques", "maire", "maires", "agglomération", "syndicat mixte", "institution", "institutions",
        "élu", "élus", "tribunal", "tribunaux", "politique", "politiques", "député", "députés", "sénateur", "sénateurs", "préfecture"
    ],
    "Initiative personnelle/quotidienne": [
        "personnel", "personnels", "quotidien", "quotidiens", "citoyen", "citoyens", "citoyenne", "citoyennes", "famille", "familles", "particulier", "particuliers",
        "individuel", "individuels", "jardin", "jardins", "amateur", "amateurs", "consommateur", "consommateurs", "consommation responsable",
        "habitant", "habitants", "maison", "maisons", "personne", "personnes", "initiative", "initiatives", "consommer", "faire soi-même", "convivialité",
        "climat", "écologie", "écologique", "biodiversité", "ruralité", "dépollution", "recyclage", "environnement", "planète", "nature",
        "vélo", "vélos", "femme", "femmes", "festival", "festivals", "réemploi", "fête", "fêtes"
    ]
}

def categorize_article(content):
    if not content:
        return "Initiative personnelle/quotidienne" # default fallback
        
    content_lower = content.lower()
    scores = {cat: 0 for cat in categories}
    
    for category, words in keywords.items():
        for word in words:
            # simple count of substring occurrences
            # can use regex for word boundary to be more accurate
            matches = len(re.findall(r'\b' + re.escape(word) + r'\b', content_lower))
            scores[category] += matches
            
    # Find the category with max score
    best_category = max(scores, key=scores.get)
    
    # if maximum score is 0, provide a default
    if scores[best_category] == 0:
        return "Non catégorisé "
        
    return best_category

with open(input_csv, "r", encoding="utf-8") as f_in, \
     open(output_csv, "w", encoding="utf-8", newline='') as f_out:
     
    reader = csv.DictReader(f_in)
    fieldnames = reader.fieldnames
    
    # Add new column name if not already there
    if "catégorie_tag" not in fieldnames:
        fieldnames.append("catégorie_tag")
        
    writer = csv.DictWriter(f_out, fieldnames=fieldnames)
    writer.writeheader()
    
    for row in reader:
        # Get content from the 'Content' column
        content = row.get("Content", "")
        # Also might be useful to check 'Catégories', 'Étiquettes', 'Title'
        title = row.get("Title", "")
        tags = row.get("Étiquettes", "")
        cat_field = row.get("Catégories", "")
        
        full_text = f"{title} {cat_field} {tags} {content}"
        
        tag = categorize_article(full_text)
        row["catégorie_tag"] = tag
        writer.writerow(row)

print("Processing complete. The new file is saved as db_clean_tagged.csv")
