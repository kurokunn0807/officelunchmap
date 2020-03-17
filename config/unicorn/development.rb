# Sample verbose configuration file for Unicorn (not Rack)
#
# This configuration file documents many features of Unicorn
# that may not be needed for some applications. See
# http://unicorn.bogomips.org/examples/unicorn.conf.minimal.rb
# for a much simpler configuration file.
#
# See http://unicorn.bogomips.org/Unicorn/Configurator.html for complete
# documentation.

# Use at least one worker per core if you're on a dedicated server,
# more will usually help for _short_ waits on databases/caches.

worker_processes 1    # CPUのコア数の２～４倍程度を指定。

# http://stackoverflow.com/questions/16388342
# unicornはVM Wareの共有フォルダに出力できない。
#
# listen "/home/webmaster/sites/development/rakuraku_system/tmp_not_shared/nginx-unicorn.sock"
listen "/tmp/nginx-unicorn.officelunchmap.development.sock"
timeout 90

pid "/home/webmaster/sites/development/officelunchmap/tmp_not_shared/unicorn.officelunchmap.development.pid"

stderr_path "/home/webmaster/sites/development/officelunchmap/log/development.log"
stdout_path "/home/webmaster/sites/development/officelunchmap/log/development.log"

preload_app true
GC.respond_to?(:copy_on_write_friendly=) and
  GC.copy_on_write_friendly = true

check_client_connection false

before_fork do |server, worker|

  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.connection.disconnect!

  old_pid = "#{server.config[:pid]}.oldbin"
  if old_pid != server.pid
    begin
      sig = (worker.nr + 1) >= server.worker_processes ? :QUIT : :TTOU
      Process.kill(sig, File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end
end

after_fork do |server, worker|
  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.establish_connection
end
