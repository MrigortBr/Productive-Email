        function detectTheme(){
            const theme = localStorage.getItem("theme")
            if (!theme){
                localStorage.setItem("theme", "light")
            }else{
                document.getElementById("theme-switcher").setAttribute("attr-theme", theme)
                document.body.setAttribute("attr-theme", theme)
            }
        }

        detectTheme()

        function change(element){
            const attr = element.getAttribute("attr-theme")
            const themeColor = attr == "dark" ? "light" : "dark";
            element.setAttribute("attr-theme", themeColor)
            document.body.setAttribute("attr-theme", themeColor)
            localStorage.setItem("theme", themeColor)
        }