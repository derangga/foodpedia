import { ChefHat } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <main className="max-w-2xl m-auto p-8 gap-8">
      <section className="relative rounded-xl w-full h-72 overflow-hidden my-8">
        <Image
          src={"/assets/dummy-food.webp"}
          fill
          style={{ objectFit: "cover" }}
          alt="content-1"
        />
      </section>
      <section className="w-full space-y-4">
        <h1 className="font-poppins font-semibold text-4xl">
          Spicy Vermicelli Noodles Salad Numero Uno
        </h1>
        <h3>
          This is a refreshing Vermicelli Noodle Salad that is quick to make and
          super healthy at only 170 calories per serving! The dressing is made
          with Asian ingredients and is very neutral so will suit most Asian
          foods, including Chinese, Thai, Vietnamese, Japanese, and even Korean
          dishes like Bulgogi. Try it with Chinese Chicken Wings, Asian Glazed
          Salmon or Asian Chilli Garlic Prawns (Shrimp)!
        </h3>
        <div className="py-4">
          <span>Tags</span>
          <p className="font-bold text-orange-400">
            Asian Food, Spicy, Homemade, Simple Cooking
          </p>
        </div>
        <div className="p-8 rounded-xl shadow-md space-y-2">
          <h2 className="font-poppins text-xl font-semibold">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>1 (6.75 ounce) package thin rice noodles</li>
            <li>2 (10 ounce) Asian Glazed Salmon</li>
            <li>⅓ cup seasoned rice wine vinegar</li>
            <li>3 tablespoons fish sauce</li> <li>3 cloves garlic, minced</li>
            <li>
              1 tablespoon Asian chili paste (such as sambal oelek), or more to
              taste
            </li>
            <li>1 teaspoon brown sugar</li> <li>¼ teaspoon salt</li>
            <li>4 green onions, chopped, and more to garnish</li>
            <li>1 cup carrots, cut into thin matchsticks</li>
            <li>½ cup chopped fresh herbs (basil, mint, and cilantro)</li>
            <li>½ cup chopped peanuts, and more to garnish</li>
            <li>
              1 teaspoon sesame oil 6 grilled boneless, skinless chicken thighs
              (Optional)
            </li>
            <li>¼ cup Fresno chile peppers, cut into rings (Optional)</li>
          </ul>
        </div>
        <div className="py-8 space-y-4">
          <h2 className="font-poppins text-2xl font-semibold">
            Cooking <span className="text-orange-400">Instructions</span>
          </h2>
          <div>
            <span className="font-bold text-orange-400">Step 1</span>
            <p>
              Place noodles in a large bowl; cover with hot water. Stir and
              allow to soak until softened, about 15 minutes. Drain and rinse
              thoroughly.
            </p>
          </div>
          <div>
            <span className="font-bold text-orange-400">Step 2</span>
            <p>
              Combine vinegar, fish sauce, garlic, chili paste, brown sugar and
              salt in a bowl. Add 4 green onions, carrots, basil, mint, and
              cilantro. Stir in noodles, 1/2 cup peanuts, and sesame oil; toss
              to coat. Set aside for flavors to absorb, 30 minutes.
            </p>
          </div>
          <div>
            <span className="font-bold text-orange-400">Step 3</span>
            <p>
              Heat a grill pan or skillet over medium-high heat. Lightly oil the
              surface and grill the chicken until fully cooked, about 5-7
              minutes per side. Let rest before slicing.
            </p>
          </div>
          <div>
            <span className="font-bold text-orange-400">Step 4</span>
            <p>
              While the chicken rests, give the noodle mixture a final toss to
              ensure even coating. Taste and adjust seasoning with additional
              fish sauce, vinegar, or chili paste if needed.
            </p>
          </div>
          <div>
            <span className="font-bold text-orange-400">Step 5</span>
            <p>
              Top servings with grilled chicken and Fresno chiles; garnish with
              green onions and peanuts.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
