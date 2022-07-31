AFRAME.registerComponent("create-marker",{
    init:async function(){
      
      var Toys=await this.getToys()
      Toys.map(Toys=>{
        console.log(Toys)
        var mainscene=document.querySelector("#main-scene")
          var marker=document.createElement("a-marker")
          marker.setAttribute("id",Toys.id)
          marker.setAttribute("type","pattern")
          marker.setAttribute("url",Toys.marker_pattern_url)
          //marker.setAttribute("cursor",{rayOrigin:"mouse"})
         // marker.setAttribute("marker-handler",{})
          mainscene.appendChild(marker)
          var model=document.createElement("a-entity")
          model.setAttribute("id", Toys.id)
          model.setAttribute("position",Toys.model_geometry.position)
          model.setAttribute("rotation", Toys.model_geometry.rotation)
          model.setAttribute("scale",Toys.model_geometry.scale)
          model.setAttribute("gltf-model",Toys.model_url)
          model.setAttribute("gesture-handler",{})
          marker.appendChild (model)
          var camera=document.createElement("a-entity")
          camera.setAttribute("camera",{})
          marker.appendChild(camera)
          var titlePlane= document.createElement("a-plane")
          titlePlane.setAttribute("position",{x:2.9, y:-4, z:-10})
          titlePlane.setAttribute("rotation",{x:0, y:0,z:0})
          titlePlane.setAttribute("width",3)
          titlePlane.setAttribute("height",5)
          titlePlane.setAttribute("gesture-handler",{})
          titlePlane.setAttribute("text",{
            value:Toys.Toys_name.toUpperCase(),
            color:"black",
            font:"monoid",
            position:"fixed"
  
          })
          mainscene.appendChild(titlePlane)
          var discription=document.createElement("a-plane")
          discription.setAttribute("position",{x:2.4, y:0, z:-5})
          discription.setAttribute("rotation",{x:0, y:0, z:0})
          discription.setAttribute("width",2)
          discription.setAttribute("height",4)
          discription.setAttribute("material","color","pink")
          discription.setAttribute("gesture-handler",{})
          discription.setAttribute("text",{
            value:Toys.discription.join("\n\n"),
            color:"black",
            font:"monoid",
            position:"fixed"
          })
        })
        },
          getToys: async function(){
            return firebase.firestore().collection("Toys").get().then(snap=>{return snap.docs.map(doc=>doc.data())})
        } 
        })