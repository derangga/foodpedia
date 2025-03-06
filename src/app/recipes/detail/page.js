import { ChefHat } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="lg:flex lg:max-w-3xl max-w-xl m-auto lg:py-16 p-4 gap-8">
      <aside className="lg:sticky top-8 h-fit">
        <div className="bg-slate-100 rounded-2xl lg:max-w-[400px] gap-4 p-3 flex flex-col justify-between">
          <div className="relative rounded-xl w-full h-72 overflow-hidden">
            <Image
              src={"/assets/dummy-food.webp"}
              fill
              style={{ objectFit: "cover" }}
              alt="content-1"
            />
          </div>
          <div className="flex justify-center items-center gap-2 bg-slate-300 rounded-full px-4 py-2 w-fit">
            <ChefHat size={18} />
            <p>Asian Cuisine</p>
          </div>
          <div className="font-light text-small space-y-2">
            <p>Tags:</p>
            <div className="flex flex-wrap gap-x-2 ">
              <p>#lazis</p>
              <p>#enak</p>
              <p>#asian</p>
              <p>#homemade</p>
              <p>#kokirumah</p>
              <p>#mantapjiwa</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="w-full p-4 space-y-4">
        <div className="font-poppins font-semibold text-3xl">
          Spicy Vermicelli Noodles Salad Numero Uno
        </div>
        <div>
          This is a refreshing Vermicelli Noodle Salad that is quick to make and
          super healthy at only 170 calories per serving! The dressing is made
          with Asian ingredients and is very neutral so will suit most Asian
          foods, including Chinese, Thai, Vietnamese, Japanese, and even Korean
          dishes like Bulgogi. Try it with Chinese Chicken Wings, Asian Glazed
          Salmon or Asian Chilli Garlic Prawns (Shrimp)!
        </div>
        <div className="text-xl font-bold">Ingredients</div>
        <div>
          <ul className="list-disc list-inside">
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
        <div className="text-xl font-bold">Directions</div>
        <div>
          <span className="font-bold">Step 1</span>
          <p>
            Place noodles in a large bowl; cover with hot water. Stir and allow
            to soak until softened, about 15 minutes. Drain and rinse
            thoroughly.
          </p>
        </div>
        <div>
          <span className="font-bold">Step 2</span>
          <p>
            Combine vinegar, fish sauce, garlic, chili paste, brown sugar and
            salt in a bowl. Add 4 green onions, carrots, basil, mint, and
            cilantro. Stir in noodles, 1/2 cup peanuts, and sesame oil; toss to
            coat. Set aside for flavors to absorb, 30 minutes.
          </p>
        </div>
        <div>
          <span className="font-bold">Step 3</span>
          <p>
            Heat a grill pan or skillet over medium-high heat. Lightly oil the
            surface and grill the chicken until fully cooked, about 5-7 minutes
            per side. Let rest before slicing.
          </p>
        </div>
        <div>
          <span className="font-bold">Step 4</span>
          <p>
            While the chicken rests, give the noodle mixture a final toss to
            ensure even coating. Taste and adjust seasoning with additional fish
            sauce, vinegar, or chili paste if needed.
          </p>
        </div>
        <div>
          <span className="font-bold">Step 5</span>
          <p>
            Top servings with grilled chicken and Fresno chiles; garnish with
            green onions and peanuts.
          </p>
        </div>
      </main>
    </div>
  );
}
