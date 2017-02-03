
viewObject = 
{
    el: '#modelView',
    data: 
    {
        imgSrc: '',
        pannelTitle: '',
        pannelDate: '',
        currentObject: 1,
        showSpinner: true,
    },
    methods:
    {
        getNext:function()
        {
            console.log("inside get Next")
            this.imgSrc = ''
            this.currentObject++
            drawResponse(this.currentObject)

        },

        getPrevious:function()
        {
            console.log("inside get previous")
        }
    }
}

mv = new Vue(viewObject)