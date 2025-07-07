---
layout: plain
title: Integration By Parts
permalink: /courses/calculus/integrationByParts
mathjax: true
---

# Integration by Parts

In the last few lectures, we've been deep diving into the details of finding a good candidate for an *inverse* derivation.

We've seen that whereas the derivation is essentially computing the **slope** of the tangent line to the graph of a function, its inverse should be computing the **area** under the graph.

### What we know

In the past few lectures, we defined the Riemann integral of a bounded function of a real variable $$f:[a,b]\to\mathbb R$$. Recall that the existence of the Riemann integral is not granted for all functions, but we saw that if $$f:[a,b]\to\mathbb R$$ is continuous, then it is Riemann-integrable, although this is not necessary. However, a bounded function is Riemann-integrable if and only if it has at most countably many discontinuities in $$[a,b]$$. We've denoted the integral of $$f$$ as

$$
\int_{a}^b f(x)\operatorname dx,
$$

and we've seen that it satisfies many pleasant properties, such as being $$\mathbb R$$-linear. Moreover, the set of Riemann-integrable functions form an $$\mathbb R$$-algebra, meaning that it is closed under sum, product and scalar product.

Most importantly, we've seen that integrating a function $$f:[a,b]\to\mathbb R$$ essentially amounts to computing a **primitive**, also known as an **antiderivative**, that is <u><b>a</b></u> continuous function $$F:[a,b]\to\mathbb R$$, differentiable in $$(a,b)$$ and such that $$F^\prime = f$$. If such a function exists and $$f$$ is Riemann-integrable, then the ***fundamental theorem of calculus*** tells us that

$$
\int_{a}^b f(x)\operatorname dx=F(b)-F(a).
$$

Recall that a primitive exists if $$f$$ is continuous, and an obvious choice is given by

$$
F(x)=\int_{a}^x f(t)\operatorname dt.
$$

This has lots of extremely useful consequences, and we've already seen one in the ***Integration by Substitution*** formula, which enables us to compute integrals of functions of the form $$f(\varphi(x))\cdot\varphi^\prime(x)$$, where $$\varphi:[a,b]\to I$$ is continuously differentiable function and $$f:I\to\mathbb R$$ is continuous, via the formula

$$
\int_{a}^{b}f(\varphi(x))\cdot\varphi^\prime(x)\operatorname dx = \int_{\varphi(a)}^{\varphi(b)}f(u)\operatorname du.
$$


### The Integration by Parts formula

What if I asked you to compute the integral of an apparently deceivingly simple function, say $$\log x$$. More specifically, say that I asked to compute the following integral

$$
\int_1^e\log x\operatorname dx.
$$

Well, $$\log x$$ is definitely not hidden among the entries of our table of easy integrals of known functions. Then you might think to try and solve this integral by substitution. Let's try that. I guess that one of the most reasonable substitution that might come to mind would be to define $$u(x) = e^{-x}$$, so that $$\operatorname du = -e^{-x}\operatorname dx$$. Then, recalling our recipe for taking integrals of composite functions (that is, *integration by substitution*), we have that

$$
\int_1^e\log x\operatorname dx = -\int_0^{1}ue^{-u}\operatorname du.
$$

It doesn't seem we've made much of a progress, does it? Maybe you could try other substitutions, bit I can assure you it wouldn't lead anywhere easily, unless you really really know your good old Gamma functions.

Clearly, it's not possible to transform the integral of $$\log x$$ in a form that can simply be integrated by inspection. And that is bad, as this is such a simple function that its integral is ubiquitous in essentially any field of science - from the definition of entropy in physics, to surprisal in information theory and information content in machine learning.

What shall we do then? Should we give up mathematics and go do something else?

We're in luck today, as here enters the star of the show:

<center><strong><em>Integration by Parts</em></strong></center>

In our last lecture, we've seen how substitution is essentially the integration counterpart of the chain rule, that is how to differentiate composite functions. You should recall that when we talked about derivatives we had two main pieces of machinery to differentiate functions:

1. the **chain rule**:

$$
(f\circ g)^\prime(x) = \left((f^\prime\circ g)\cdot(g^\prime)\right)(x);
$$

2. **Leibniz rule**:

$$
(f\cdot g)^\prime(x) = (f^\prime\cdot g)(x) + (f\cdot g^\prime)(x).
$$

Integration by parts is then a way to use Leibniz rule to simplify the computation of certain integrals (such as the one we've seen before), which cannot be solved by more elementary methods.

{% assign ibp_content = "
Let $F, G$ be continuously differentiable functions on $[a,b]\subset\mathbb R$, such that $F^\prime := f$ and $G^\prime := g$  are Riemann-integrable functions on $[a,b]$. Then

$$
\int_{a}^b F(x)g(x)\operatorname dx=\left[F(x)G(x)\right]_{a}^b-\int_{a}^b f(x)G(x)\operatorname dx.
$$
"
%}
{% include theorem_env.html
  type="theorem"
  label="thm:ibp"
  title="Integration by Parts"
  content=ibp_content
%}{% capture ibp_reference %}
  {% include ref.html label='thm:ibp' %}
{% endcapture %}

{% assign tip_content = "
Even though the formula from the theorem might look a bit scary at first, one cool mnemonic trick is to start from Leibniz formula for the derivative of a product
\\[
(f\cdot g)^\prime(x)=(f^\prime\cdot g)(x) + (f\cdot g^\prime)(x),
\\]
and formally integrate it (after all, recall that thanks to the Fundamental Theorem of Calculus, in order to compute an integral it's sufficient to look for a primitive function)
\\[
\begin{split}
\int(f^\prime g)(x)\operatorname dx + \int (f\cdot g^\prime)(x)\operatorname dx &= \int (f\cdot g)^\prime(x)\operatorname dx\\
&=f(x)\cdot g(x) + C.
\end{split}
\\]
Finally, rearranging the formula above, it can be brought in the form of the theorem, namely
\\[
\int f^\prime (x)g(x)\operatorname dx = f(x)g(x)-\int f(x)g^\prime(x)\operatorname dx +C.
\\]
" %}
{% include theorem_env.html
  type="tip"
  content=tip_content
%}

Let's quickly see how the IbP theorem is proved.

{% assign ibp_proof = "
Let $H(x) = (F\cdot G)(x)$. Since $F$ and G are continuously differentiable functions on $[a,b]$, they are continuous on $[a,b]$, and so is $H(x)$. Using Leibniz rule, we have

\\begin{equation}
H^\prime (x) = F^\prime(x)\cdot G(x) + F(x)\cdot G^\prime(x) = f(x)\cdot G(x) + F(x)\cdot g(x),\label{E.1}
\\end{equation}

so $H^\prime (x)$ is Riemann-integrable on $[a,b]$. By applying the Fundamental Theorem of Calculus to the integral of $H^\prime(x)$ we get

\\begin{equation}
\int_{a}^b H^\prime(x)\operatorname dx = \mathscr H(b)-\mathscr H(a), \label{E.2}
\\end{equation}

where $\mathscr H$ is a primitive function of $H^\prime$. However, we know one obvious primitive for $H^\prime$, which is $H$ itself.
Finally, integrating \\eqref{E.1} and putting it together with \\eqref{E.2}, we get

$$
H(b) - H(a) = \int_{a}^b f(x)\cdot G(x)\operatorname dx + \int_{a}^b F(x)\cdot g(x)\operatorname dx,
$$

which proves the theorem after rearranging the equation.
" %}
{% include proof_env.html
  content=ibp_proof
  title = 'of Thm. 1'
%}

Great! So now we have a new result for computing integrals at our disposal! But, how do we use it practically? Is it really useful? Here is an informal, human-readable translation of what the theorem is really telling us.

If you're given the integral of the product $$f\cdot g$$ of two functions $$f$$ and $$g$$, that is

$$
\int_{a}^b f(x)g(x)\operatorname dx
$$

proceed as follows:

1. Among $$f$$ and $$g$$ choose the one which you  can integrate easily, let it be $$f$$, with (some) primitive $$F$$, and the one of which you can easily compute the derivative, let it be $$g$$.
2. Integrate $$f$$ to $$F$$ and comput

    $$
    (g\cdot F)(b)-(g\cdot F)(a).
    $$

3. Differentiate $$g$$ and compute

    $$
    \int_{a}^b F(x)g^\prime(x)\operatorname dx.
    $$

    If you've made a smart choice in **1.**, this integral should be easier to compute than the one you started with.
4. Subtract the results you got from **2.** and **3.** to get the integral you started with.

Now, you will have noticed that I said to choose as $$f$$ the function that is easiest to integrate, and for $$g$$ the one that is easiest differentiated. What does that mean in practice? In truth, this is one of those things for which only experience will tell you which choice is the smart one, but we still have one last mnemonic trick that might be of help, some sort of guideline in choosing.

{% assign tip_content = "
A common strategy is to choose $$g$$ and $$f$$ according to the order of preference specified by LIATE acronym
\\[
g \longrightarrow \text{L. I. A. T. E.} \longleftarrow f
\\]
where initials stand for
- **L**ogarithimic functions
- **I**nverse trigonometric functions
- **A**lgebraic functions
- **T**rigonometric functions
- **E**xponential functions
" %}{% include theorem_env.html
  type="tip"
  content=tip_content
%}

We're now ready to revisit our motivating example, and let's see how Integration by Parts come in our help.

{% assign ex_content = "
Lets' try to compute
$$
\int_{1}^e \log x\operatorname dx.
$$
Where is the product in this integral? Well, let's make an apparently silly choice, and put $$f(x)=1$$ and $$g(x)=\log(x)$$. Obviously $$(f\cdot g)(x)=\log x$$, moreover

$$
\int 1\operatorname dx = x+C
$$

(recall that primitive functions are only defined up to additive constants $$C\in\mathbb R$$), and

$$
g^\prime (x) = \frac{\operatorname d}{\operatorname dx}\log x = \frac{1}{x}.
$$

With the notation of our previous recipe, we have that $$F(x)=x$$ (we can safely disregard the integration constant, as we're doing definite integrals), and $$g^\prime(x)=x^{-1}$$. Additionally, notice that the integral from point **3.** in our recipe is now extremely easy to compute, and it's nothing but

$$
\int_{1}^e F(x)\cdot g^\prime(x)\operatorname dx=\int_{1}^e 1\operatorname dx=\left[x\right]_{1}^e = e-1
$$

Putting everything together, we get

$$
\begin{split}
\int_{1}^e \log x \operatorname dx &= \left[F(x)g(x)\right]_{1}^e - \int_{1}^e F(x)g^\prime(x)\operatorname dx\\
&= \left[x\log x\right]_{1}^e-\int_{1}^e 1\operatorname dx\\
&= e - \left(e - 1\right) = 1.
\end{split}
$$
" %}{% include theorem_env.html
  type="example"
  content=ex_content
%}

This is not the only way the IbP formula is useful though! Let's look at an another example, where a little more ingenuity is needed!

{% assign ex_content = "
Consider now $$h(x)=\cos^2(x)$$. The function $$h(x)$$ is a continuous function of the whole real line, and we'll try to find its primitive $$H(x)$$. We'll start by noticing that $$h(x) = 1-\sin^2(x)$$. This immediately tells us that

\\begin{equation}
\int \cos^2(x)\operatorname dx = \int(1-\sin^2(x))\operatorname dx = x - \int\sin^2x\operatorname dx. \label{ex2.1}
\\end{equation}

Moreover, we know from our table of elementary integrals that

$$
\int \sin x\operatorname dx=-\cos x+C,
$$

while $$(\sin x)^\prime=\cos(x)$$. If we let $$f(x)=g(x)=\sin(x)$$, we have $$f(x)g(x)=\sin^2(x)$$, and we'll apply the IbP formula to this product.

\\begin{equation}
\int\sin^2x\operatorname dx = \int(f\cdot g)(x)\operatorname dx=-\cos(x)\sin(x) + C+\int \cos^2(x)\operatorname dx. \label{ex2.2}
\\end{equation}

Substituting \\eqref{ex2.1} in \\eqref{ex2.2}, we finally get

$$
\int\cos^2x\operatorname dx = x + \cos(x)\sin(x) + C - \int\cos^2(x)\operatorname dx,
$$

and bringing all the integrals to the left hand side, we conclude that

$$
\int\cos^2x\operatorname dx = \frac{x+\sin x\cos x}{2} + C.
$$
" %}{% include theorem_env.html
  type="example"
  content=ex_content
%}


Let's end this lecture with a few rules of thumb for solving integrals via Integration by Parts.

{% assign tip_content = "
- Choose $$f$$ to be the ***largest*** factor of the integrand you can easily integrate, either directly or by using the substitution method. You will often need to rewrite the integral to see this largest factor and, remember $$f(x)=1\cdot f(x)$$. This is especially useful when you cannot integrate ***any obvious*** factor within the integrand.
- If you can integrate ***all*** factors in the integrand, then choose $$g$$ first to be the factor whose derivative changes form or becomes a constant.
- Sometimes you have to use Integration by Parts more than once while evaulating an integral. In this case, try to stay with the same function-type choice for all Integrations by Parts.
" %}{% include theorem_env.html
  type="tip"
  title = "Rules of Thumb for applying Integration by Parts"
  content=tip_content
%}

As always, you should get your hands dirty to build some feeling for a new concept, so here are some fun exercises for you to get some practice!

{% assign exercise = "
Consider $$f(x)=x\log(x)$$. Can you integrate $$f(x)$$ over $$I=[0,1]\subset\mathbb R$$? If so, compute its integral over $$I$$.
" %}{% include theorem_env.html
  type="exercise"
  content=exercise
%}

{% assign exercise = "
Evaluate the following integrals

$$
\begin{align}
  &\int_{0}^\pi x^2\cos(4x)\operatorname dx, \\
  &\int 6\arctan\left(\frac{8}{x}\right) \operatorname dx, \\
  &\int (4x^2-9x^2+7x+3)e^{-x}\operatorname dx
\end{align}
$$
" %}{% include theorem_env.html
  type="exercise"
  content=exercise
%}

{% assign exercise = "
Let $$f$$ be a real, continuously differentiable function on $[a,b]\subset\mathbb R$, such that $f(a)=f(b)=0$ and
\\[
\int_{a}^b f^2(x)\operatorname dx = 1.
\\]
Prove that
\\[
\int_{a}^b xf(x)f^\prime(x)\operatorname dx = -\frac{1}{2}.
\\]
" %}{% include theorem_env.html
  type="exercise"
  content=exercise
%}

{% assign exercise = "
Define $f(x)$ to be the function
\\[
f(x) := \int_{x}^{x+1}\sin(t^2)\operatorname d t.
\\]
1. Prove that
 $$
 |f(x)|<1/x \text{ if } x>0.
 $$
1. Prove that $2f(x) = \cos(x^2)-\cos((x+1)^2)+r(x)$,
where $|r(x)|<c/x$ and $c\in\mathbb R$ is a constant.

> ***Hint***: for part 1, start with the substitution $u=t^2$, and than integrate by parts to show that
>\\[
>f(x) = \frac{\cos x^2}{2x}-\frac{\cos(x+1)^2}{2(x+1)}-\int_{x^2}^{(x+1)^2}\frac{\cos u}{4u^{3/2}}\operatorname du,
>\\]
>and then replace $\cos u$ by $-1$.
" %}{% include theorem_env.html
  type="exercise"
  content=exercise
%}

{% assign tip_content = "
There is a cool trick for computing the previous $\log x$ integral. You should first convince yourself that
\\[
\log(x)=\left.\frac{\operatorname d}{\operatorname ds}x^s\right|_{s=0}.
\\]
Then we have

$$
\begin{split}
\int_1^e\log x\operatorname dx=\int_1^e\left.\frac{\operatorname d}{\operatorname ds}x^s\right|_{s=0}\operatorname dx&=\left.\frac{\operatorname d}{\operatorname ds}\int_1^ex^s\operatorname dx\right|_{s=0} \\
&=\left.\frac{\operatorname d}{\operatorname ds}\left[\frac{x^{s+1}}{s+1}\right]_1^e\right|_{s=0} \\
&=\left.\frac{\operatorname d}{\operatorname ds}\frac{e^{s+1}-1}{s+1}\right|_{s=0} \\
&=\left.\frac{se^{s+1}+1}{(s+1)^2}\right|_{s=0}=1.
\end{split}
$$

Clearly, you might have spotted something cheeky here: the ***exchange of the integral-derivative order must be justified!***
To show that this is a legit move, one can either invoke *Leibniz integral rule*, or take out the big guns, in the form of the *dominated convergence theorem*. In any case, these are considerations well beyond the scope of this lecture, and you'll just have to trust me for the moment that we can indeed exchange the order of integration and differentiation in this case!
" %}{% include theorem_env.html
  type="tip"
  content=tip_content
%}
