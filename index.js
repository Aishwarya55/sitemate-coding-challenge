window.onload = function(){
    var btn = document.getElementById("clickbtn");
    var modal = document.getElementById("myModal");
    btn.onclick = function(){
        modal.style.display = "block";
    }
}


class PopupModal extends HTMLElement {
    constructor() {
      super();
  
      this.heading = "";
      this.subheading = "";
    }
  
    connectedCallback() {
      this.ques = this.getAttribute("ques");
      this.items = JSON.parse(this.getAttribute("items"));
        
      this.render();
      this.addEventListener('click', this)
    }

    handleEvent(ev){
        if(ev.target.nodeName.toLowerCase().includes("button"))
        this.handleClick(ev)
    }
    handleClick(i){
        // var obj = document.getElementById(i)
        var event = new CustomEvent("clickevent", {
            detail: i.target.id
          });
          window.dispatchEvent(event);
    }
  
    render() {

        const buttons = this.items.map(i => {
            return `<button id='${i}'>${i}</button>`
        })
      this.innerHTML = `
       <div id="myModal" class="modal">

      
      <div class="modal-content">
          <div class="ques">
              ${this.ques}
          </div>
          <div class="btn-container">
          ${buttons.join("")}
          </div>
      </div>
  
  </div> 
        `;
    }
  }
  
  customElements.define("popup-modal", PopupModal);
  window.addEventListener("clickevent", function(e) { 
      console.log(e) 
      var modal = document.getElementById("myModal");
      const notify = document.getElementById("notification");
      notify.style.display = "block";
      notify.innerHTML = "you just clicked \""+ e.detail + "\""
      modal.style.display = "none";
    });
