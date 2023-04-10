import { Component, Input , OnInit} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{

  @Input() message: any;
  @Input() styl:any
  
  ngOnInit(): void {
    $(document).ready(function(){
      $('.box').fadeOut(4000)
    })
}
}