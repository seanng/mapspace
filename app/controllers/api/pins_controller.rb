module Api
  class PinsController < ApplicationController
    def create

    end

    def update
      new_input = params[:input]
      puts params[:input]
      pin_id = params[:id]
      Pin.update(pin_id, {description: new_input})
      render message: "finished"
    end

    def destroy

    end
  end
end